from os import stat
from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models.base_model import db, get_missing_field_name
from models.student import *
from models.course import *
from models.course_location import *
from models.role_type import *
from models.supported_language import *
import json


class QueryHandler:
    '''
    A class to handle query to db, support basic functionality such as 
    - get all objects, 
    - get object by attribute,
    etc.
    '''

    def __init__(self, db_obj, model, model_name):
        self.db_obj = db_obj
        self.model = model
        self.model_name = model_name

    @staticmethod
    def create_generic_json_response(object, code=200):
        '''
        Given an object and respond code, return a JSON response with respond code and a header of allowing access control origin
        resp.headers.add('Access-Control-Allow-Origin', '*')
        '''
        response = jsonify(object)
        response.status_code = code
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    def handle_get_all_request(self):
        '''
        Get all object from the db and return a REST response
        '''
        try:
            objects = self.model.query.all()
            return QueryHandler.create_generic_json_response([e.serialize() for e in objects])
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

    def handle_get_first_object_by_attribute(self, **kwargs):
        '''
        Given keyword arguments, get the first object with matching query condition.
        For example, 
        if the input is name='some_name', 
        then we will return the first object of the db model which field 'name' equals to 'some_name'
        '''
        try:
            object = self.model.query.filter_by(**kwargs).first()
            if object is None:
                return QueryHandler.create_generic_json_response(
                    {'message': 'Unable to find any {} with filter {}'.format(self.model_name, kwargs)}, 400)
            return QueryHandler.create_generic_json_response(object.serialize())
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

    def handle_get_all_objects_by_attribute(self, **kwargs):
        '''
        Given keyword arguments, get all objects with matching query condition.
        For example,
        if the input is name='some_name', then we will return all objects of the db model which field 'name' equals to 'some_name'
        '''
        try:
            objects = self.model.query.filter_by(**kwargs).all()
            if len(objects) == 0:
                return QueryHandler.create_generic_json_response(
                    {'message': 'Unable to find any {} with filter {}'.format(self.model_name, kwargs)}, 400)
            return QueryHandler.create_generic_json_response([e.serialize() for e in objects])
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)


    def handle_get_all_objects_with_text_command(self, text_command):
        '''
        Given text command, get all objects with matching query condition.
        For example,
        if the input is name='some_name', then we will return all objects of the db model which field 'name' equals to 'some_name'
        '''
        try:
            objects = self.model.query.filter(text_command).all()
            if len(objects) == 0:
                return QueryHandler.create_generic_json_response(
                    {'message': 'Unable to find any {} with filter {}'.format(self.model_name, text_command)}, 400)
            return QueryHandler.create_generic_json_response([e.serialize() for e in objects])
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

    def handle_add_new_object_request(self, request):
        '''
        Given a JSON request, create new object in db, if no such object existed in the db.
        The searching criteria is set by model.unique_kwargs().
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not json'}, 405)
        object, error_message = self.model.create_from_json(request.get_json())
        if object is None:
            return QueryHandler.create_generic_json_response({'message': error_message}, 405)
        try:
            kwargs = object.unique_kwargs()
            # we first check if there is any existing object with this argument
            existing_object = self.model.query.filter_by(**kwargs).first()
            if existing_object is not None:
                # we found an object with this filter, so we cant create a new object
                return QueryHandler.create_generic_json_response(
                    {'message': 'Bad Request: {} with {} already exists'.format(self.model_name, kwargs)}, 400)
            self.db_obj.session.add(object)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                {'message': 'A new {} added with {}'.format(self.model_name, kwargs)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)


    def handle_delete_object_by_attribute(self, **kwargs):
        '''
        Given keyword arguments, delete the first object with matching query condition.
        For example,
        if the input is name='some_name', 
        then we will delete the first object of the db model which field 'name' equals to 'some_name'
        '''
        try:
            object = self.model.query.filter_by(**kwargs).first()
            if object is None:
                return QueryHandler.create_generic_json_response(
                    {'message': 'Unable to find any {} with {}'.format(self.model_name, kwargs)}, 400)
            self.db_obj.session.delete(object)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                {'message': '{} with {} is deleted'.format(self.model_name, kwargs)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

    def handle_update_object_by_attribute(self, request, **kwargs):
        '''
        Update table entry according to request
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not json'}, 405)
        content = request.get_json()
        try:
            object = self.model.query.filter_by(**kwargs).first()
            if object is None:
                return QueryHandler.create_generic_json_response(
                    {'message': 'Unable to find any {} with {}'.format(self.model_name, kwargs)}, 400)
            if not object.update(content):
                return QueryHandler.create_generic_json_response(
                        {'message': 'Bad Request: There is nothing to update for {} with {}'.format(self.model_name, kwargs)}, 400)
            self.db_obj.session.merge(object)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                    {'message': '{} with {} is updated'.format(self.model_name, kwargs)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)
    
    def handle_update_multiple_objects_by_attribute(self, request, **kwargs):
        '''
        Update multiple table entries according to request
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not json'}, 405)
        content = request.get_json()
        try:
            objects = self.model.query.filter_by(**kwargs).all()
            if objects is None or len(objects) == 0:
                return QueryHandler.create_generic_json_response(
                    {'message': 'Unable to find any {} with {}'.format(self.model_name, kwargs)}, 400)
            for each_obj in objects:
                each_obj.update(content)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                    {'message': '{} with {} is updated'.format(self.model_name, kwargs)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)


class StudentAnswerQueryHandler(QueryHandler):
    '''
    A class inherits from QueryHandler and perform specific functionality related to student answer
    '''

    def handle_add_multiple_objects_with_attribute(self, request, **kwargs):
        '''
        Add student answers to db with fields specified in kwargs
        '''
        if not request.is_json:
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not json'}, 405)
        content_list = json.loads(json.dumps(request.get_json()))
        if type(content_list) != type([]):
            return QueryHandler.create_generic_json_response({'message': 'Invalid input: not list'}, 405)
        try:
            objects = []
            for content in content_list:
                # Make sure that 'obj' contains fields from 'kwargs' with the same values
                for arg_key in kwargs:
                    if content.get(arg_key) is None:
                        content[arg_key] = kwargs.get(arg_key)
                    elif str(content.get(arg_key)) != kwargs.get(arg_key):
                        return QueryHandler.create_generic_json_response({'message': 'Invalid input: got {} with not {}'.format(self.model_name, kwargs)}, 405)
                object, error_message = self.model.create_from_json(content)
                if object is None:
                    return QueryHandler.create_generic_json_response({'message': error_message}, 405)
                objects.append(object)
            for obj in objects:
                self.db_obj.session.add(obj)
            self.db_obj.session.commit()
            return QueryHandler.create_generic_json_response(
                {'message': '{} new {} added with {}'.format(len(objects), self.model_name, kwargs)})
        except Exception as e:
            return QueryHandler.create_generic_json_response({'message': 'unexpected error: {}'.format(str(e))}, 400)

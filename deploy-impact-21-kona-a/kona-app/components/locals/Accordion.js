import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, SafeAreaView, Switch, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { GlobalStyles } from '../globals/GlobalStyles';
import { LocalStyles } from './LocalStyles';
import { AntDesign } from '@expo/vector-icons';
import CheckBox from '../globals/CheckBox';

const CONTENT = [
{
  title: 'Area of Support'
},
{
  title: 'People to Support',
  content: ['Refugees', 'Homeless People', 'LGBT', 'Victims of domestic violence', 'Disabled People', 'Victims of violence', 'Victims of human trafficking', 'Orphans', 'Mothers', 'Migrants', 'Farmers', 'Students']
},
{
  title: 'Gender',
  content:
    [
      'Women', 'Men', 'Non-binary', 'Other'
    ]
},
{
  title: 'Age Group',
  content:
    [ 'Children', 'Youth', 'Adults'
    ]
},
{
  title: 'Location',
  content:
    [
      'Dakar', 'Saint-Louis', 'Mbour', 'Pikine'
    ]
},
];

const mainCategories = [
  {
    title: 'Crisis',
    content:
      [
        'Humanitarian',  'Emergencies',  'Disaster',  'Human Trafficking',  'War'
      ]
    },
  {
  title: 'Health',
  content:
    [
      'Maternal care', 'Disease', 'HIV/AIDS', 'Disability', 'Sexual Health', 'Nutrition', 'Healthcare', 'Mental Health'
    ]
  },
  {
    title: 'Social Services',
    content:
      [
        'Shelter', 'Water', 'Food', 'Protection', 'Victim of violence',  'Safety',  'Poverty', 'Sanitation', 'LBGT'
      ]
    },
  {
  title: 'Education',
  content:
    [ 
      'Training', 'Financial Support', 'Facilities', 'Entrepreneurship'
    ]
  },
  {
  title: 'Employment',
  content:
    [
      'Vocational Training', 'Entrepreneurship', 'Technical Support', 'Partnerships', 'Financial Support', 'Apprenticeship'
    ]
  },
  {
    title: 'Migration',
    content:
      [
        'Refugee', 'Asylum', 'Reintegration', 'Citizenship'
      ],
    }, 
    {
    title: 'Legal',
    content:
      [
        "Women's Rights", "Children's Rights", "Human Rights", "Human Trafficking", "Child Protection", "Victim Advocacy", "Victim of Violence"
      ]
    }, 
  {
  title: 'Agriculture',
  content:
    [ 'Technology', 'Education', 'Seed Donation', 'Agriculture Development',
    ]
  },
];

const AccordionMainCategories = ({onCheckMain, onCheckSub, onUncheckMain, onUncheckSub, selectedKeywords}) => {

  const [activeSections, setActiveSections] = useState([]);

  const [multipleSelect, setMultipleSelect] = useState(false);

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const initiallyCheckedMain = (category) => {
    return selectedKeywords.has(category.title) || category.content.every((subCategory) => selectedKeywords.has(subCategory))
  }

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}>
        <View style={GlobalStyles.flexDirectionColumn}>
          <View style={LocalStyles.topFilterCategories}>
            <View style={LocalStyles.checkboxItems}>
              <CheckBox answer = {section.title} 
              onCheck={(answer) => onCheckMain(section)}
              onUncheck={onUncheckMain} initiallyChecked={initiallyCheckedMain(section)}/>
            </View>
            { isActive ? <AntDesign name="minus" size={24} color="#212121" /> : <AntDesign name="plus" size={24} color="#212121" /> }
          </View>
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    const mainCategoriesText = section.content

    return (
      <Animatable.View
        duration={100}>
        <Animatable.Text
          animation={isActive ? 'fadeInDown' : undefined}>
          <View>
            { mainCategoriesText.map((subCategory) => (
              <TouchableOpacity >
                <View style={LocalStyles.subCategories}>
                  <CheckBox answer={subCategory} initiallyChecked={selectedKeywords.has(section.title) || selectedKeywords.has(subCategory)} onCheck={() => onCheckSub(section,subCategory)} onUncheck={() => onUncheckSub(section,subCategory)} />
                </View>
              </TouchableOpacity>
            ))
            }
          </View>
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView>
      <View style={GlobalStyles.whiteContainer}>
        <ScrollView>
          <Accordion
            style={LocalStyles.accordion}
            activeSections={activeSections}
            sections={mainCategories}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}            
          />
        </ScrollView>
      </View>
    </SafeAreaView>

  );
};


const AccordionFilter = ({onCheckMain, onCheckSub, onUncheckMain, onUncheckSub, onCheck, onUncheck, selectedKeywords}) => {

  const [activeSections, setActiveSections] = useState([]);

  const setSections = (sections) => {
    setActiveSections(sections);
  };

  const renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}>
        <View style={LocalStyles.topFilterSection}>
          <Text style={LocalStyles.accordionTextTitle}>{section.title}</Text>
          { isActive ? <AntDesign name="minus" size={24} color="#212121" /> : <AntDesign name="plus" size={24} color="#212121" /> }
        </View>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    const checkboxText = section.content

    return (
      <Animatable.View
        duration={100}>
        <Animatable.Text
          animation={isActive ? 'fadeInDown' : undefined}>
          <View style={GlobalStyles.flexDirectionColumn}>
            {section.title == 'Area of Support'
              ? <AccordionMainCategories onCheckMain={onCheckMain} onCheckSub={onCheckSub} onUncheckMain={onUncheckMain} onUncheckSub={onUncheckSub} selectedKeywords={selectedKeywords}/> // write the new accordion in here
              : checkboxText.map((text) => (
                  <TouchableOpacity >
                    <View style={LocalStyles.checkboxItems}>
                      <CheckBox answer={text} onCheck={onCheck} onUncheck={onUncheck} initiallyChecked={selectedKeywords.has(text)} />
                    </View>
                  </TouchableOpacity>
                ))
            }
          </View>
        </Animatable.Text>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView>
      <View style={GlobalStyles.whiteContainer}>
        <ScrollView>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />
        </ScrollView>
      </View>
    </SafeAreaView>

  );
};

export default AccordionFilter;

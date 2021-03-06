import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { GlobalStyles } from '../components/globals/GlobalStyles';
import ResultsButton from '../components/locals/ResultsButton';
import Data from '../data/kona_orgs.json';
import AccordionFilter from '../components/locals/Accordion';
import Footer from "../components/globals/Footer";
import { filterByKeywordInAnyField } from '../components/globals/FilterUtils';

export default function Accordion({ route, navigation }) {

  const receivedKeywords = route.params;

  const [selectedKeywords, setSelectedKeywords] = useState(receivedKeywords);

  const filterByOneOfThreeCategories = (orgs, keyword) => {
    const keywordUppercase = keyword.toUpperCase();
    const fields = ["MainCategory", "SubCategory", "TargetGroup", "SubTargetGroup", "Region"];
    const newOrgs = filterByKeywordInAnyField(orgs, fields, keywordUppercase);
      return newOrgs;
  }

  const filterByKeywords = (keywords) => {
    let filteredData = Data;
    keywords.forEach((keyword) => filteredData = filterByOneOfThreeCategories(filteredData, keyword) );
    return filteredData;
  }

  const filteredBySelectedKeywords = filterByKeywords(selectedKeywords);

  const onCheckSubHandler = (category, subCategoryTitle) => {
    const newSelectedKeywords = new Set(selectedKeywords);
    newSelectedKeywords.add(subCategoryTitle);

    if (category.content.every((subCategory) => newSelectedKeywords.has(subCategory))) {
      category.content.forEach((subCategory) => newSelectedKeywords.delete(subCategory));
      newSelectedKeywords.add(category.title);
    }
    setSelectedKeywords(newSelectedKeywords);
  }

  const onCheckMainHandler = (category) => {
    const newSelectedKeywords = new Set(selectedKeywords);
    newSelectedKeywords.add(category.title);
    category.content.forEach((subCategory) => {newSelectedKeywords.delete(subCategory)});
    setSelectedKeywords(newSelectedKeywords);
  }

  const onUncheckSubHandler = (category, subCategoryTitle) => {
    const newSelectedKeywords = new Set(selectedKeywords);
    if (selectedKeywords.has(category.title)) {
      newSelectedKeywords.delete(category.title);
      category.content.forEach((subCategory) => newSelectedKeywords.add(subCategory));
    }
    newSelectedKeywords.delete(subCategoryTitle);
    setSelectedKeywords(newSelectedKeywords);
  }

  const onUncheckMainHandler = (answer) => {
    const newSelectedKeywords = new Set(selectedKeywords);
    newSelectedKeywords.delete(answer);
    setSelectedKeywords(newSelectedKeywords);
  }

  const onCheckHandler = (answer) => {
    const newSelectedKeywords = new Set(selectedKeywords);
    newSelectedKeywords.add(answer);
    setSelectedKeywords(newSelectedKeywords);
  }

  const onUncheckHandler = (answer) => {
    const newSelectedKeywords = new Set(selectedKeywords);
    newSelectedKeywords.delete(answer);
    setSelectedKeywords(newSelectedKeywords);
  }

    return(
        <ScrollView style={{backgroundColor: "white" }}>
            <View >
              <AccordionFilter onCheckMain={onCheckMainHandler} onCheckSub={onCheckSubHandler} onUncheckMain={onUncheckMainHandler} onUncheckSub={onUncheckSubHandler} onCheck={onCheckHandler} onUncheck={onUncheckHandler} selectedKeywords={selectedKeywords}/>
            </View>
            <View style={GlobalStyles.flexCenter}>
              <ResultsButton filteredOrgs={filteredBySelectedKeywords} selectedKeywords={selectedKeywords} />
            </View>
            <Footer/>
      </ScrollView>
    )
}

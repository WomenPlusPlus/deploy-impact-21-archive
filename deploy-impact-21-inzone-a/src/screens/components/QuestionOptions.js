import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuestionOptions(props) {
  let examQuestionsJ = JSON.parse(props.qDATA); 
  
  const options = examQuestionsJ[props.qOption].Options;
  const q_objectId = examQuestionsJ[props.qOption].objectId;
  const [selectedIndex, setSelectedIndex] = useState(false);

  useEffect(() => {
    setSelectedIndex(false);
  }, [q_objectId]);

  // This helps if you have an array of components (that are not custom)
  // Otherwise the value is changed for all buttons as you said
  function highlightSelected(index) {
    setSelectedIndex(index);}

  return (
    <View>
    
      {options.map((answer, index) => (
        <TouchableOpacity
          key={index}
          onPress={(e) => {
            highlightSelected(index);
            props.saveOption(answer, q_objectId); 
          }}
          style={{
            backgroundColor: index === selectedIndex ? "blue" : "#DDDDDD",
          }}
        >
          <Text>{answer.option}</Text>
        </TouchableOpacity>
      ))}
      
    </View>
  );
}

const styles = StyleSheet.create({});

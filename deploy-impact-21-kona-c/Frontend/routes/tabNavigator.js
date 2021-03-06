import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Feather, Entypo } from "@expo/vector-icons";
import { View, Pressable, Alert, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//Screens
import HomeScreen from "../screens/welcomeScreen/welcomeScreen";
import SdgScreen from "../screens/sdgScreen/sdgScreen";
import EmergencyScreen from "../screens/emergencyScreen/emergencyScreen";
import HotlineScreen from "../screens/hotlineScreen/hotlineScreen";
import LocationScreen from "../screens/locationScreen/locationScreen";
import InfoAge from "../screens/personalInfo/4_ageScreen";
import PersonType from "../screens/personalInfo/5_personTypeScreen";
import InfoGender from "../screens/personalInfo/3_genderScreen";
import OtherGender from "../screens/personalInfo/3.1_otherGenderScreen";
import InstitutionType from "../screens/personalInfo/1_institutionTypeScreen";
import HelpForWho from "../screens/personalInfo/2_helpForWhoScreen";
import NextButton from "../components/nextButton";
import NeedsScreenA from "../screens/needsScreens/needsScreenA";
import NeedsScreenB from "../screens/needsScreens/needsScreenB";
import NeedsScreenC from "../screens/needsScreens/needsScreenC";
import NeedsScreenD from "../screens/needsScreens/needsScreenD";
import SdgOrganisationsList from "../screens/organisationsLists/sdgOrganisationsList";
import CompaniesOrganisationsList from "../screens/organisationsLists/companiesOrganisationsList";
import OrganisationsListScreen from "../screens/organisationsLists/organisationsListScreen";
import OrganisationDetailsScreen from "../screens/organisationDetailsScreen/organisationDetailsScreen";
import OrganisationsLists from "../components/organisationsLists";
import NeedsB_to_D from "../components/needsB_to_D";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const handlePress = (routeName) => {
  let questionnaireMessage = "an option";
  switch (routeName) {
    case "LocationScreen":
      questionnaireMessage = "a region";
      break;
    case "InfoGender":
      questionnaireMessage = "a gender";
      break;
    case "OtherGender":
      questionnaireMessage = "or specify a";
      break;
    case "InfoAge":
      questionnaireMessage = "an age range";
      break;
    case "NeedsScreenA":
      questionnaireMessage = "an area of interest";
      break;
    case "NeedsScreenB":
      questionnaireMessage = "a subtopic";
      break;
    case "NeedsScreenC":
      questionnaireMessage = "a subtopic";
      break;
  }
  let alertMessage = `Please select ${questionnaireMessage}. This will help show only relevant organisations.`;
  switch (routeName) {
    case "OrganisationsListScreen":
      alertMessage =
        "This is the list of organisations identified based on your search. If you can't find the help you need, you can change the Region, Age and Gender options to search again.";
      break;
    case "OrganisationDetailsScreen":
      alertMessage =
        "Here you can find all the details for the organisation selected.";
      break;
    case "CompaniesOrganisationsList":
      alertMessage =
        "This is the list of organisations identified based on your search. If you can't find the help you need, you can change the Region option to search again.";
      break;
  }
  Alert.alert("Info", alertMessage);
};

const StackNavigation = () => {
  let questionnaireTitle = "";
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#171717",
        },
        headerTintColor: "#DCDCDC",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Dots." }}
      />
      <Stack.Group
        screenOptions={({ route }) => (
          route.name === "LocationScreen"
            ? (questionnaireTitle = "Select a region")
            : null,
          route.name === "InstitutionType"
            ? (questionnaireTitle = "Select a person type")
            : null,
          route.name === "HelpForWho"
            ? (questionnaireTitle = "Select for who")
            : null,
          route.name === "InfoGender"
            ? (questionnaireTitle = "Select a gender")
            : null,
          route.name === "OtherGender"
            ? (questionnaireTitle = "Select or specify")
            : null,
          route.name === "InfoAge"
            ? (questionnaireTitle = "Select an age")
            : null,
          route.name === "PersonType"
            ? (questionnaireTitle = "Select current situation")
            : null,
          route.name === "NeedsScreenA"
            ? (questionnaireTitle = "Select a topic")
            : null,
          route.name === "NeedsScreenB"
            ? (questionnaireTitle = "Select a topic")
            : null,
          route.name === "NeedsScreenC"
            ? (questionnaireTitle = "Select a topic")
            : null,
          route.name === "NeedsScreenD"
            ? (questionnaireTitle = "Select a topic")
            : null,
          route.name === "OrganisationsListScreen"
            ? (questionnaireTitle = "Your results")
            : null,
          route.name === "CompaniesOrganisationsList"
            ? (questionnaireTitle = "Your results")
            : null,
          route.name === "SdgOrganisationsList"
            ? (questionnaireTitle = "The goal results")
            : null,
          route.name === "OrganisationDetailsScreen"
            ? (questionnaireTitle = "Organisation details")
            : null,
          {
            title: questionnaireTitle,
            headerTitleAlign: "center",
            headerRight: () => {
              return (
                <View>
                  <Pressable onPress={() => handlePress(route.name)}>
                    <Entypo name="help-with-circle" size={24} color="#DCDCDC" />
                  </Pressable>
                </View>
              );
            },
          }
        )}
      >
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="InstitutionType" component={InstitutionType} />
        <Stack.Screen name="HelpForWho" component={HelpForWho} />
        <Stack.Screen name="InfoGender" component={InfoGender} />
        <Stack.Screen name="OtherGender" component={OtherGender} />
        <Stack.Screen name="InfoAge" component={InfoAge} />
        <Stack.Screen name="PersonType" component={PersonType} />
        <Stack.Screen name="NextButton" component={NextButton} />
        <Stack.Screen name="NeedsScreenA" component={NeedsScreenA} />
        <Stack.Screen name="NeedsScreenB" component={NeedsScreenB} />
        <Stack.Screen name="NeedsScreenC" component={NeedsScreenC} />
        <Stack.Screen name="NeedsScreenD" component={NeedsScreenD} />
        <Stack.Screen
          name="OrganisationsLists"
          component={OrganisationsLists}
        />
        <Stack.Screen name="NeedsB_to_D" component={NeedsB_to_D} />
        <Stack.Screen
          name="OrganisationsListScreen"
          component={OrganisationsListScreen}
        />
        <Stack.Screen
          name="SdgOrganisationsList"
          component={SdgOrganisationsList}
        />
        <Stack.Screen
          name="CompaniesOrganisationsList"
          component={CompaniesOrganisationsList}
        />
        <Stack.Screen
          name="OrganisationDetailsScreen"
          component={OrganisationDetailsScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const TabNavigatorBottom = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        shifting={false}
        initialRouteName="HomeScreenTab"
        activeColor="white"
        barStyle={{ backgroundColor: "#171717" }}
      >
        <Tab.Screen
          name="HomeScreenTab"
          component={StackNavigation}
          options={{
            tabBarColor: "#141414",
            tabBarLabel: "Home",
            tabBarIcon: () => (
              <Feather
                name="home"
                activeColor="white"
                size={26}
                color={"white"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SDG"
          component={SdgScreen}
          options={{
            tabBarLabel: "SDGs",
            tabBarColor: "#00689D",
            tabBarIcon: () => (
              <Image
                source={require("../assets/sdg.png")}
                style={{ width: 24, height: 24 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Emergency"
          component={EmergencyScreen}
          options={{
            tabBarLabel: "Emergency",
            tabBarColor: "#3F7E44",
            tabBarIcon: () => (
              <Feather name="phone" size={26} color={"white"} />
            ),
          }}
        />
        <Tab.Screen
          name="Hotline"
          component={HotlineScreen}
          color={"white"}
          options={{
            tabBarLabel: "Hotline",
            tabBarColor: "#A21942",
            tabBarIcon: () => (
              <Feather name="headphones" size={26} color={"white"} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default TabNavigatorBottom;

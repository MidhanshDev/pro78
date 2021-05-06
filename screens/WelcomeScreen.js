import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class BookDonateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      username: "",
      address: "",
      isModalVisible: false,
    };
  }
  userSignUp = (username, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
        .then((response) => {
          db.collection("users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobile_number: this.state.mobileNumber,
            username: this.state.email,
            address: this.state.address,
          });
          return (
            Alert.alert("User Added Successfully"),
            "",
            [
              {
                text: "OK",
                onPress: () => this.setState({ isModalVisible: false }),
              },
            ]
          );
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.Message;
          return Alert.alert(errorMessage);
        });
    }
  };
  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
      <ScrollView style={{ width: "100%" }}>
          <KeyboardAvoidingView
          behavior="padding"
          >
            <Text style={styles.modalTitle}>Registration</Text>
          <TextInput
            style={styles.formTexInput}
            placeholder={"First Name"}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Last Name"
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Mobile Number"
            maxLength={10}
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({
                mobileNumber: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Address"
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                email: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                confirmpassword: text,
              });
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => {
                this.userSignUp(
                  this.state.email,
                  this.state.password,
                  this.state.confirmpassword
                );
              }}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                this.setState({
                  isModalVisible: false,
                });
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this.showModal();
              this.setState({
                isModalVisible: true,
              });
            }}
          >
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <View style={{ backgroundColor: "cyan", flex: 1 }}>
        {this.showModal()}
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <TextInput
            style={styles.loginBox}
            placeholder="USERNAME"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                username: text,
              });
            }}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TextInput
            style={styles.loginBox}
            placeholder="PASSWORD"
            secureTextEntry={true}
            keyboardType="numeric"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              this.userLogin(this.state.username, this.state.password);
            }}
          >
            <Text
              style={{ color: "#ff5722", fontSize: 18, fontWeight: "bold" }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}
          >
            <Text
              style={{ color: "#ff5722", fontSize: 18, fontWeight: "bold" }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#897",
  },
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    borderColor: "#ff3",
  },
  loginButton: {
    width: 300,
    height: 50,
    backgroundColor: "#436",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    margin: 10,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    flex: 1,
    alignItems: "center",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    margin: 50,
    color: "#3a5",
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 80,
    marginTop: 80,
    backgroundColor: "#a57",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#b46",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: "#d34",
    fontSize: 15,
    fontWeight: "bold",
  },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  cancelButtonText: {
    color: "#d67",
  },
});

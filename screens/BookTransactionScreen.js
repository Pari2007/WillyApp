import React,{Component} from "react"
import {Text,View,StyleSheet,TouchableOpacity} from "react-native"

import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
          hasCameraPermissions : null,
          scanned : false,
          scannedData : "",
          buttonState : "normal",
        }
      }

      getCameraPermission=async()=>{
        const {status}= await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
          hasCameraPermissions : status==="granted"
        })
      }
      handleBarCodeScanned = async({type,data})=>{
       this.setState({
           scanned : true,
           scannedData : data,
           buttonState : "normal"
       })
      }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState==="clicked" && hasCameraPermissions ){
           return(
               <BarCodeScanner onBarCodeScanned = {scanned ? undefined  : this.handleBarCodeScanned} style = {StyleSheet.absoluteFillObject}/>
           )

        } else if(buttonState=== "normal"){
            return(
            <View style = {{flex : 1, justifyContent : "center",
            alignItems : "center"}}>

                <Text>{hasCameraPermissions===true ?
                this.state.scannedData : 
                "Request for Camera Permission"
                 }</Text>

                <TouchableOpacity onPress = {this.getCameraPermission} style={{
                  backgroundColor : "red",
                 margin : 20, 
                 alignItems: "center",
                 alignSelf: "center"
                 }}>

                <Text style = {{
                fontSize : 20,
                color : "white",
               textDecorationLine : "underline"
                }}>
                  SCAN QR CODE!
                  </Text>
                </TouchableOpacity>
               
               
                </View>
              )

        }

       
    }
}


import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import renderIf from 'render-if';
import Header from '../Shared/Components/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BottomTab from '../Shared/Components/BottomTab';
import { fontSize, scalableheight } from '../Utilities/fonts'
import Animated from 'react-native-reanimated';
import PlainHeader from '../Shared/Components/PlainHeader';
import moment from 'moment';
import { getBlogDetail } from '../Actions/actions';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BlogDetail = ({navigation, drawerAnimationStyle, route}) => {
    const {Lang, blogDetail} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        StatusBar.setHidden(false);
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setBarStyle('dark-content');
    }, []);
    useEffect(() => {
        dispatch(getBlogDetail(route.params.blogID, Lang));
    }, [route, Lang]);
    
    return (
        <Animated.View style={{flex:1, ...drawerAnimationStyle, backgroundColor:'#FFF'}}>
            <View style={{flex:12, alignSelf:"center", paddingTop: getStatusBarHeight()}}>
                <PlainHeader 
                    title={Lang == "en" ? "Blogs" : "المدونات"}
                />
                <ScrollView style={{flex: 1}}>
                    <View
                        style={{
                            marginHorizontal: scalableheight.two,
                            marginTop: scalableheight.two,
                            marginBottom: scalableheight.four,
                        }}
                    >
                        <View style={{...styleSheet.shadow, width:"100%", height: scalableheight.twentyfour, borderRadius:fontSize.eleven}}>
                            <Image
                                resizeMode="stretch"
                                style={{width:"100%", height: "100%", borderRadius:fontSize.eleven,resizeMode:'stretch'}}
                                source={{uri: blogDetail?.bannerImage}}
                            />
                        </View>
                        <View style={{flexDirection:Lang==="en"?"row":'row-reverse'}}>
                            <View style={{flex:1}}>
                                <Text style={{color:"#C59E6E", fontSize:fontSize.fifteen, fontFamily:"Rubik-Medium", marginTop:"4%", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                                    {blogDetail?.title}
                                </Text>
                           
                            </View>
                            <View style={{marginLeft:Lang==="ar"?scalableheight.two:0,marginRight:Lang==="en"? scalableheight.two:0,marginTop: -scalableheight.four}}>
                                <View style={{backgroundColor:"#C59E6E",paddingHorizontal:scalableheight.two,paddingVertical:scalableheight.onepointfive,borderRadius:8,}}>
                                    <Text style={{color:"#fff", fontSize:fontSize.eightteen, fontFamily:"Rubik-Bold", textAlign:'center'}}>
                                        {moment(blogDetail?.postedDate).format("D")}
                                    </Text>
                                    <Text style={{color:"#fff", fontSize:fontSize.fourteen, fontFamily:"Rubik-Medium", textAlign:'center',marginTop:"1%"}}>
                                        {moment(blogDetail?.postedDate).format("MMM")}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <Text style={{color:"#707070", fontSize:fontSize.twelve, fontFamily:"Rubik-Medium", marginTop:"4%", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                                    {blogDetail?.description}
                                </Text>
                            
                    </View>
                </ScrollView>
                <View
                    style={{
                    flexDirection: 'row',
                    paddingVertical: 14,
                    backgroundColor:"#FFF",
                    justifyContent: 'center'
                }}>
                    {blogDetail?.twitter && (
                        <TouchableOpacity style={{ marginRight: 12, justifyContent:"center",height: scalableheight.five, width:scalableheight.five, borderWidth:2, borderColor:'rgba(0,0,0,0.2)', borderRadius:10 }} onPress={() => Linking.openURL('https://'+blogDetail?.twitter)}>
                             
                      
                      <AntDesign
                      style={{ alignSelf:"center"}}
          name="twitter"
          color={'rgba(0,0,0,0.4)'}
          size={fontSize.eightteen}
        />
             
                        </TouchableOpacity>
                    )}

                    {blogDetail?.facebook && (
                        <TouchableOpacity style={{ marginRight: 12, justifyContent:"center",height: scalableheight.five, width:scalableheight.five, borderWidth:2, borderColor:'rgba(0,0,0,0.2)', borderRadius:10 }} onPress={() => Linking.openURL('https://'+blogDetail?.facebook)}>
                        <Fontisto
style={{ alignSelf:"center"}}
name="facebook"
color={'rgba(0,0,0,0.4)'}
size={fontSize.eightteen}
/>
                        </TouchableOpacity>
                    )}

                    {blogDetail?.linkedIn && (
                        <TouchableOpacity style={{ marginRight: 12, justifyContent:"center",height: scalableheight.five, width:scalableheight.five, borderWidth:2, borderColor:'rgba(0,0,0,0.2)', borderRadius:10 }} onPress={() => Linking.openURL('https://'+blogDetail?.linkedIn)}>
                              <Fontisto
                        style={{ alignSelf:"center"}}
                        name="linkedin"
                        color={'rgba(0,0,0,0.4)'}
                        size={fontSize.eightteen}
                        />
                        </TouchableOpacity>
                    )}

                    {blogDetail?.mailLink && (
                        <TouchableOpacity style={{ marginRight: 12, justifyContent:"center",height: scalableheight.five, width:scalableheight.five, borderWidth:2, borderColor:'rgba(0,0,0,0.2)', borderRadius:10 }} onPress={() => Linking.openURL('mailto://' + blogDetail?.mailLink)}>
                           <Fontisto
                            style={{ alignSelf:"center"}}
                            name="email"
                            color={'rgba(0,0,0,0.4)'}
                            size={fontSize.eightteen}
                            />
                        </TouchableOpacity>
                    )}

                    {blogDetail?.urlLink && (
                        <TouchableOpacity style={{ marginRight: 12, justifyContent:"center",height: scalableheight.five, width:scalableheight.five, borderWidth:2, borderColor:'rgba(0,0,0,0.2)', borderRadius:10 }} onPress={() => Linking.openURL('https://'+blogDetail?.urlLink)}>
                           <Fontisto
       style={{ alignSelf:"center"}}
       name="link"
              color={'rgba(0,0,0,0.4)'}
       size={fontSize.eightteen}
       />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {/* <View style={{flex: 1, backgroundColor: '#FFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <BottomTab/>
            </View> */}
        </Animated.View>
    );
};

const styleSheet = StyleSheet.create({
  Text1: {
    color: '#F9B35E',
    fontSize: 18,
    paddingBottom: 10,
    fontFamily: 'Rubik-SemiBold',
  },
  Text2: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 20,
    fontFamily: 'Rubik-Regular',
    width: '90%',
    color:"black"
  },
  Image: {
    width:241,
    height:104,
    marginBottom:"10%"
  },
  BackgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 3,
  },
});
export default BlogDetail;

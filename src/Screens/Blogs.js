import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import BottomTab from '../Shared/Components/BottomTab';
import { fontSize, scalableheight } from '../Utilities/fonts'
import Animated from 'react-native-reanimated';
import PlainHeader from '../Shared/Components/PlainHeader';
import moment from 'moment';
import { blogsCountHandle, clearBlogs, clearBlogsCount, getBlogDetail, getBlogs } from '../Actions/actions';

const Blogs = ({navigation, drawerAnimationStyle}) => {
    const dispatch = useDispatch();
    const {Lang, blogList, blogsCount} = useSelector(state => state.userReducer);
    const [loadMoreLoader, setLoadMoreLoader] = useState(false);
    const [pageSize, setPageSize] = useState(8);
    const [pageNumber, setPageNumber] = useState(1);
    const [previousData, setPreviousData] = useState([]);
    
    useEffect(() => {
        StatusBar.setHidden(false);
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setBarStyle('dark-content');
    }, []);
    useEffect(() => {
        setLoadMoreLoader(false);
        // const unsubscribe = navigation.addListener('focus', () => {
            if (blogsCount == 1) {
                const count = blogsCount;
                dispatch(clearBlogs());
                setPageSize(8);
                setPageNumber(1);
                setPreviousData([]);
                const data = {
                    "search": "",
                    "pageSize": 8,
                    "pgno": count,
                    "sortBy": 1,
                    "lang" : Lang,
                    "startDate" : null,
                    "endDate" : null
                };
                dispatch(getBlogs(data));
            }
            console.log("blogList =====> ", blogList.length);
            console.log("blogsCount =====> ", blogsCount);
        // });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        // return unsubscribe;
    }, [Lang]);
    useEffect(() => {
        console.log("CLEAR BLOGS ======> ");
        dispatch(clearBlogsCount());
    }, [Lang]);
    const renderItem = (value) => {
        const key = value.index;
        const val = value.item;
        return (
            <TouchableOpacity
                key={key}
                activeOpacity={.7}
                onPress={() => {
                    // dispatch(getBlogDetail(val.id, Lang));
                    navigation.navigate("BlogDetail", {
                        blogID: val.id
                    });
                }}
                style={{
                    ...styleSheet.shadow,
                    marginHorizontal: scalableheight.two,
                    marginTop: key === 0 ? scalableheight.two : 0,
                    marginBottom: scalableheight.three,
                    backgroundColor: "#FFF",
                    borderRadius: fontSize.eleven,
                    borderRadius: fontSize.eleven,
                    paddingBottom: scalableheight.two,
                }}
            >
                <View style={{width:"100%", height: scalableheight.twentytwo, borderRadius:fontSize.eleven,marginBottom:scalableheight.one}}>
                    <Image
                        resizeMode= "stretch"
                        style={{width:"100%", height: "100%", borderRadius:fontSize.eleven}}
                        source={{uri: val.bannerImage}}
                    />
                </View>
                <View style={{paddingHorizontal: scalableheight.two}}>
                    <Text style={{color:"#C59E6E", fontSize:fontSize.twelve, fontFamily:"Rubik-Medium", marginTop:"2%", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                        {val.title}
                    </Text>
                    <Text numberOfLines={2} style={{color:"#113038", fontSize:fontSize.fourteen, fontFamily:"Rubik-Regular", marginTop:"2%", alignSelf:Lang==="en"?"flex-start":"flex-end", marginLeft:"1%" }}>
                        {val.description}
                    </Text>
                </View>
                {/* <View style={{backgroundColor:"#C59E6E",paddingHorizontal:scalableheight.two,paddingVertical:scalableheight.onepointfive,borderRadius:8,position:'absolute',top:scalableheight.seventeen,left:Lang==="ar"?scalableheight.two:null,right:Lang==="en"?scalableheight.two:null}}>
                    <Text style={{color:"#fff", fontSize:fontSize.eightteen, fontFamily:"Rubik-Bold", textAlign:'center'}}>
                        {moment(val.postedDate).format("D")}
                    </Text>
                    <Text style={{color:"#fff", fontSize:fontSize.fourteen, fontFamily:"Rubik-Medium", textAlign:'center',marginTop:"1%"}}>
                        {moment(val.postedDate).format("MMM")}
                    </Text>
                </View> */}
            </TouchableOpacity>
        )
    };
    const renderFooter = () => {
        return (
            <View style={{marginBottom:scalableheight.five}}>
                {loadMoreLoader ?
                    // <ActivityIndicator color={"#000"} />
                    null
                : 
                    null
                }
            </View>
        )
    };
    const loadMoreNewsFeed = () => {
        if (blogList.length >= 8) {
            if (previousData.length === blogList.length) return;
            setLoadMoreLoader(true);
            const count = blogsCount+1;
            console.log("count =====> ", count);
            setPageNumber(count);
            const data = {
                "search": "",
                "pageSize": pageSize,
                "pgno": count,
                "sortBy": 1,
                "lang" : Lang,
                "startDate" : null,
                "endDate" : null
            };
            dispatch(blogsCountHandle(count));
            dispatch(getBlogs(data));
            setPreviousData(blogList);
        }
    };

    return (
        <Animated.View style={{flex:1, ...drawerAnimationStyle, backgroundColor:'#FFF'}}>
            <View style={{flex:12, alignSelf:"center", paddingTop: getStatusBarHeight()}}>
                <PlainHeader 
                    title={Lang == "en" ? "Blogs" : "المدونات"}
                />
                <FlatList
                    data={blogList}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    onEndReached={() => loadMoreNewsFeed()}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={{flex: 1, backgroundColor: '#FFF', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <BottomTab/>
            </View>
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

export default Blogs;

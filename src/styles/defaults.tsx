import { Dimensions, StyleSheet, Platform } from "react-native";
import { theme } from "../theme";

export default StyleSheet.create({
    pageMargin: {
        marginHorizontal: 18
    },
    image:{
       width: '100%',
       height: '100%',
    },
    flexRow:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    flexColumn:{
       flexDirection: 'column'
    },
    flex:{
        flex: 1,
    }
})
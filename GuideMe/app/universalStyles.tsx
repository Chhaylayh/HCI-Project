import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
      },
      pageContainer: {
        padding: 20,
        backgroundColor: "white",
        width: "100%",
        height: "100%"
      },
      stepContainer: {
        paddingVertical: 10,
        paddingHorizontal: 0,
        marginBottom: 20,
      },
      button: {
        backgroundColor: "darkblue",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
      secondaryButton: {
        backgroundColor: "white",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      },
      secondaryButtonText: {
        color: "darkblue",
        fontSize: 18,
        fontWeight: "bold",
      },
      inputLabel: {
        alignSelf: "flex-start",
        fontSize: 18,
        marginBottom: 5,
        color: "darkblue",
      },
      input: {
        width: "100%",
        padding: 10,
        marginBottom: 20,
        borderColor: "darkblue",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
      },
      titleBlue: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: "bold",
        color: "darkblue",
        textAlign: "center",
      },
      iconRow: {flexDirection:"row", justifyContent: "space-between"},
  
      pageContainerTasks: {
        padding: 5,
        backgroundColor: "darkblue",
        color:"white",
        width: "100%",
       // height: "100%",
        fontSize:30,
        alignSelf:'center',
      },
      imageStyle: {
        width: "90%",        // Width relative to the parent container
        height: undefined,   // Automatically adjust the height
        aspectRatio: "3/2",      // Maintain aspect ratio
        padding: 20,          // Add a small amount of padding around the image
        alignSelf: 'center',
        resizeMode: 'contain',
      },
      
      scrollContainer: {
        flexGrow: 1,
        padding: 5,  // Add padding inside the scrollable area
      },
      smallText: {
        fontSize: 20,
        marginBottom: 10,
        color: "white",
        alignSelf:'center',
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      },
      buttonLarge: {
        width: 100,
        height: 100,
        marginBottom: 20,
        backgroundColor: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      item: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
      },
      itemText: {
        fontSize: 16,
        color: 'black',
      },
      beigeBackground: {
        backgroundColor: '#f5f5dc',
      },
})
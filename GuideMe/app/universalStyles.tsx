import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
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
      },
})
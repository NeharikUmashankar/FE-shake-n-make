import { StyleSheet, Image } from "react-native";

export default function ImageViewer({ placeholderImageSource,logo=false }) {
  return (
  <Image source={placeholderImageSource} className={logo ? "h-7 w-7 bg-gray-300 p-4 rounded-full":""} style={logo? "" : styles.image} 
  />
);
}

const styles = StyleSheet.create({
  image: { width: 320, 
          height: 440, 
        borderRadius: 18 },
});

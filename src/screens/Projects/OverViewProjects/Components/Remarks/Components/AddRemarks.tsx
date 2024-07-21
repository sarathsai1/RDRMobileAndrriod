import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import RoundInput from "../../../../../../components/inputs/RoundInput";
import RoundButton from "../../../../../../components/buttons/RoundButton";
import RoundPicker from "../../../../../../components/inputs/RoundPicker";
import DocImageUpload from "../../../../../../components/DocImageUpload";

type SelectDropDownProps = {
    data: string[];
    label: string;
};


const AddRemarks: React.FC<SelectDropDownProps> = ({ data, label }) => {
    const [selectedValue, setSelectedValue] = useState<string | number>('');

    function handleChange(text: string): void {
    }

    const handleValueChange = (itemValue: string | number) => {
        setSelectedValue(itemValue); // Reset the picker value
    };

    const imageUploaded = (uri: string, data?: any, metadata?: any) => {
        // let imageUri: string = onChangeUploadImages(uri);
        // setProfileImage(uri)
        // console.log('imageUploaded', imageUri)
        console.log(uri, 'uri');
        // console.log(data, 'data');
        // console.log(metadata, 'metadata');
    }

    const imagePicked = (uri: string, data?: any, metadata?: any) => {
        // let imageUri: string = onChangeUploadImages(uri);
        // setProfileImage(uri)
        // console.log('imagePicked', imageUri)
        console.log(uri, 'uri');
        // console.log(data, 'data');
        // console.log(metadata, 'metadata');
    };


    function handleSubmit(): void {
    }

    return (
        <View>
            <View style={styles.inputContent}>
                <RoundPicker
                    style={styles.inputPicker}
                    selectedValue={selectedValue}
                    items={data.map((item) => ({ label: item, value: item }))}
                    placeholder={label} // Your placeholder text
                    onValueChange={handleValueChange}
                />

                <View style={{ position: 'relative' }}>
                    <RoundInput
                        placeholder="Write Remark"
                        value={''}
                        onChangeText={handleChange}
                    />

                    <TouchableOpacity style={styles.imageUploadBoxContent}>
                        <DocImageUpload
                            onImageUploaded={imageUploaded}
                            onImagePicked={imagePicked}
                            upload={false}
                            width={200}
                            height={200} fileType={"images"}>
                            <Image source={require('../../../../../../assets/icons/attached_icon.png')} style={styles.viewIcons} />
                        </DocImageUpload>
                    </TouchableOpacity>
                </View>

            </View>

            <RoundButton
                title={'Add Remark'}
                onPress={handleSubmit}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    inputContent: {},

    inputPicker: {
        marginBottom: 10
    },

    imageUploadBoxContent:{
        position: 'absolute',
        top: 8,
        right: 10,
    },

    viewIcons: {
        width: 32,
        height: 32,

    }
})

export default AddRemarks;
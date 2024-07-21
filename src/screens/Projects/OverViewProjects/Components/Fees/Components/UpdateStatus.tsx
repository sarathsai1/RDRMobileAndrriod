import React from "react";
import { StyleSheet, View } from "react-native";
import RoundInput from "../../../../../../components/inputs/RoundInput";
import RoundButton from "../../../../../../components/buttons/RoundButton";

const UpdateStatus: React.FC = () => {

    function handleChange(text: string): void {
    }

    function handleSubmit(): void {
    }

    return (
        <View>
            <RoundInput
                placeholder="Feb, Due Amount: ₹250"
                value={''}
                onChangeText={handleChange}
            />

            <RoundButton
                title={'Update Status'}
                onPress={handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({

})

export default UpdateStatus;

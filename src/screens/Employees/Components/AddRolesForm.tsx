import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RoundInput from "../../../components/inputs/RoundInput";
import RoundButton from "../../../components/buttons/RoundButton";
import { theme } from "../../../theme";

const AddRolesForm = ({ onSubmit }: { onSubmit: () => void }) => {
    function handleChange(text: string): void {
        throw new Error("Function not implemented.");
    }

    function handleSubmit(): void {
        onSubmit();
    }

    return (
        <View style={styles.formContainer}>
            <View>
                <Text style={styles.rolesTitle}>• POC</Text>
                <Text style={styles.rolesTitle}>• Assistant</Text>
            </View>

            <View>
                <Text style={styles.formTitle}>Add Roles</Text>
                <RoundInput
                    placeholder="Role"
                    value={''}
                    onChangeText={handleChange} label={""} editable={false} error={""} options={[]}                />

                <RoundButton
                    title={'Add Role'}
                    onPress={handleSubmit}
                />
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
    },
    formTitle:{
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginVertical: 10,
    },
    rolesTitle:{
         fontSize: 16,
         fontWeight: '600',
         color: theme.colors.textSecondary,
         marginBottom: 10,
         marginHorizontal: 20,
    },
});

export default AddRolesForm;
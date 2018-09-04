import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { Alert, Button, Text, View } from 'react-native'
import { PickerField } from '~/components/formik/PickerField'
import { TextField } from '~/components/formik/TextField'

interface MyFormValues {
  firstName: string
  lastName: string
  language: string
}

export const Form: React.StatelessComponent<{}> = () => {
  return (
    <Formik
      initialValues={{ firstName: '' }}
      onSubmit={(values: MyFormValues) => {
        Alert.alert(JSON.stringify(values))
      }}
      render={(props: FormikProps<MyFormValues>) => (
        <View>
          <TextField name="firstName" />
          <TextField name="lastName" />

          <Button onPress={props.handleSubmit} title="Submit" />
          <Button onPress={() => props.setFieldValue('firstName', '')} title="reset" />

          <PickerField name="language">
            <PickerField.Item label="Java" value="java" />
            <PickerField.Item label="JavaScript" value="js" />
            <PickerField.Item label="Ruby" value="rb" />
            <PickerField.Item label="Scala" value="scala" />
          </PickerField>

          <Text>{JSON.stringify(props.values, null, 4)}</Text>
        </View>
      )}
    />
  )
}

import { Field, FieldProps } from 'formik'
import * as React from 'react'
import { TextInput, TextInputProps } from 'react-native'

export interface TextFieldProps extends TextInputProps {
  name: string
}

export const TextField: React.StatelessComponent<TextFieldProps> = ({ name, ...props }) => {
  return (
    <Field
      name={name}
      render={({ field, form }: FieldProps<{ [key: string]: any }>) => {
        return (
          <TextInput
            {...props}
            value={field.value}
            onChangeText={(value: any) => {
              form.setFieldTouched(name, true, false)
              form.setFieldValue(name, value, true)
            }}
            onBlur={() => {
              form.setFieldTouched(name, true, true)
            }}
          />
        )
      }}
    />
  )
}

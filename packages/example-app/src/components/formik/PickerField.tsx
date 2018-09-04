import { Field, FieldProps } from 'formik'
import * as React from 'react'
// import ReactNativeModal from 'react-native-modal'
import { Picker, PickerItemProps, Platform, Text, TouchableHighlight, View } from 'react-native'
import { ActionSheet } from '~/components/common/ActionSheet'

export interface PickerFieldProps {
  name: string
}

export interface PickerFieldState {
  value: any
}

const PickerFieldItem: React.StatelessComponent<PickerItemProps> = props => {
  return <Picker.Item {...props} />
}

export class PickerField extends React.Component<PickerFieldProps, PickerFieldState> {
  public static Item: React.ComponentType<PickerItemProps> = PickerFieldItem
  constructor(props: PickerFieldProps) {
    super(props)
    this.state = {
      value: null,
    }
  }

  public render() {
    const { name } = this.props
    return (
      <Field
        name={name}
        render={(fieldProps: FieldProps<{ [key: string]: any }>) =>
          Platform.select({
            ios: this.renderIOSPicker(fieldProps),
            android: this.renderAndroidPicker(fieldProps),
          })
        }
      />
    )
  }

  private renderIOSPicker = ({ field, form }: FieldProps<{ [key: string]: any }>) => {
    const { name, children } = this.props
    return (
      <ActionSheet title="Select Language">
        {({ show }) => (
          <React.Fragment>
            <TouchableHighlight underlayColor="#ebebeb" onPress={show}>
              <Text>{field.value || 'Select Language'}</Text>
            </TouchableHighlight>

            <ActionSheet.Modal
              onConfirm={() => {
                form.setFieldValue(name, this.state.value, false)
                this.setState({ value: null }, () => {
                  form.setFieldTouched(name, true, true)
                })
              }}
              onCancel={() => {
                this.setState({ value: null }, () => {
                  form.setFieldTouched(name, true, false)
                })
              }}>
              {() => (
                <View>
                  <Picker
                    selectedValue={this.state.value || field.value}
                    onValueChange={value => this.setState({ value })}>
                    {children}
                  </Picker>
                </View>
              )}
            </ActionSheet.Modal>
          </React.Fragment>
        )}
      </ActionSheet>
    )
  }

  private renderAndroidPicker = ({ field, form }: FieldProps<{ [key: string]: any }>) => {
    const { name, children } = this.props
    return (
      <View style={{ borderColor: '#efefef', borderWidth: 1, width: 300 }}>
        <Picker
          selectedValue={field.value || 'Select Language'}
          onValueChange={value => {
            form.setFieldValue(name, value, false)
            this.setState({ value: null }, () => {
              form.setFieldTouched(name, true, true)
            })
          }}>
          {children}
        </Picker>
      </View>
    )
  }
}

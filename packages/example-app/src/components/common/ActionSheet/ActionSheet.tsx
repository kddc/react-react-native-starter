import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import styles from './ActionSheet.style'

export interface ActionSheetProps {
  title: string
}

export interface ActionSheetContext extends ActionSheetProps {
  isVisible: boolean
}

export interface ActionSheetMethods {
  show: () => void
  cancel: (cb: () => void) => void
  confirm: (cb: () => void) => void
}

const ActionSheetContext = React.createContext<ActionSheetContext & ActionSheetMethods | null>(null)

export interface ModalProps {
  onConfirm?: () => void
  onCancel?: () => void
  children: (props: Partial<ActionSheetContext & ActionSheetMethods>) => any
}

const Modal: React.StatelessComponent<ModalProps> = ({ onConfirm, onCancel, children }) => {
  return (
    <ActionSheetContext.Consumer>
      {context => {
        const { title, isVisible, confirm, cancel } = context
        return (
          <ReactNativeModal isVisible={isVisible} style={[styles.contentContainer]} backdropOpacity={0.4}>
            <View style={[styles.datepickerContainer]}>
              <View style={styles.titleContainer}>
                <Text style={[styles.title]}>{title}</Text>
              </View>

              {children(context)}

              <TouchableHighlight
                style={styles.confirmButton}
                underlayColor="#ebebeb"
                onPress={() => confirm(() => onConfirm())}>
                <Text style={[styles.confirmText]}>Confirm</Text>
              </TouchableHighlight>
            </View>

            <TouchableHighlight
              style={styles.cancelButton}
              underlayColor="#ebebeb"
              onPress={() => cancel(() => onCancel())}>
              <Text style={[styles.cancelText]}>Cancel</Text>
            </TouchableHighlight>
          </ReactNativeModal>
        )
      }}
    </ActionSheetContext.Consumer>
  )
}

export interface IActionSheetProps extends ActionSheetProps {
  children: (props: ActionSheetContext & ActionSheetMethods) => React.ReactNode
}

export class ActionSheet extends React.Component<IActionSheetProps, ActionSheetContext> {
  public static Modal: React.ComponentType<ModalProps> = Modal
  constructor(props: IActionSheetProps) {
    super(props)
    const { children, ...rest } = props
    this.state = {
      isVisible: false,
      ...rest,
    }
  }

  public render() {
    const context = {
      ...this.state,
      show: this.show,
      cancel: this.cancel,
      confirm: this.confirm,
    }
    return <ActionSheetContext.Provider value={context}>{this.props.children(context)}</ActionSheetContext.Provider>
  }

  private show = () => {
    this.setState({ isVisible: true })
  }

  private cancel = (cb: () => void) => {
    this.setState({ isVisible: false }, () => cb())
  }

  private confirm = (cb: () => void) => {
    this.setState({ isVisible: false }, () => cb())
  }
}

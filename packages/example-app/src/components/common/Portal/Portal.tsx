import React from 'react'
import { View } from 'react-native'
import { PortalContext, PortalContextProps, PortalMethods } from './PortalProvider'

export interface PortalProps {
  id: string
}

export interface PortalInProps extends PortalProps {
  context: PortalContextProps & PortalMethods
}

class PortalInContext extends React.Component<PortalInProps> {
  public componentWillMount() {
    const { id, context, children } = this.props
    context.setNode(id, children)
  }

  public componentDidUpdate(previousProps: any) {
    if (previousProps.children !== this.props.children) {
      const { id, context, children } = this.props
      context.setNode(id, children)
    }
  }

  public componentWillUnmount() {
    const { id, context } = this.props
    context.unsetNode(id)
  }

  public render(): React.ReactNode | null {
    return null
  }
}

export class PortalIn extends React.Component<PortalProps> {
  public render() {
    return (
      <PortalContext.Consumer>
        {context => {
          return <PortalInContext {...this.props} context={context} />
        }}
      </PortalContext.Consumer>
    )
  }
}

class PortalOut extends React.Component<PortalProps> {
  public render() {
    const { id } = this.props
    return (
      <PortalContext.Consumer>
        {context => {
          const { getNode } = context
          const node = getNode(id)
          return <View>{node || this.props.children}</View>
        }}
      </PortalContext.Consumer>
    )
  }
}

export class Portal {
  public static In: React.ComponentType<PortalProps> = PortalIn
  public static Out: React.ComponentType<PortalProps> = PortalOut
}

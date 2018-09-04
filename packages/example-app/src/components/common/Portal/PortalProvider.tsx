import React from 'react'
export interface PortalProps {}

export interface PortalContextProps extends PortalProps {
  nodes: { [id: string]: React.ReactNode }
}

export interface PortalMethods {
  setNode: (id: string, node: React.ReactNode) => void
  unsetNode: (id: string) => void
  getNode: (id: string) => React.ReactNode
}

export const PortalContext = React.createContext<PortalContextProps & PortalMethods | null>(null)

export class PortalProvider extends React.Component<{}, PortalContextProps> {
  constructor(props: {}) {
    super(props)
    this.state = {
      nodes: {},
    }
  }

  public render() {
    const context = {
      ...this.state,
      setNode: this.setNode,
      unsetNode: this.unsetNode,
      getNode: this.getNode,
    }
    return <PortalContext.Provider value={context}>{this.props.children}</PortalContext.Provider>
  }

  private setNode = (id: string, node: React.ReactNode) => {
    this.setState({
      nodes: {
        ...this.state.nodes,
        [id]: node,
      },
    })
  }

  private unsetNode = (id: string) => {
    delete this.state.nodes[id]
    this.setState({
      nodes: {
        ...this.state.nodes,
      },
    })
  }

  private getNode = (id: string): React.ReactNode => {
    try {
      return this.state.nodes[id]
    } catch {
      return null
    }
  }
}

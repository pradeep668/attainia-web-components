import ReactDOM from 'react-dom'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const modalRoot = document.querySelector('#modal-root')

const StyledModal = styled.div`
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
`

class Modal extends React.Component {
    constructor(props) {
        super(props)
        // Create a div that we'll render the modal into. Because each
        // Modal component has its own element, we can render multiple
        // modal components into the modal container.
        this.el = StyledModal
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node.
        modalRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el)
    }

    render() {
        // Use a portal to render the children into the element
        return ReactDOM.createPortal(
            // Any valid React child: JSX, strings, arrays, etc.
            this.props.children,
            // A DOM element
            this.el
        )
    }
}

Modal.propTypes = {
    children: PropTypes.node
}

export default Modal

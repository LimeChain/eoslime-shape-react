import { Component } from 'react';

class MessageComponent extends Component {

    MESSAGE_TYPES = {
        INFO: "info",
        SUCCESS: "success",
        DANGER: "danger"
    }

    state = {
        message: { text: '', class: '' }
    };

    async componentDidMount () {
        this.showMessage = this.showMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);
    }

    showMessage (text, type) {
        this.setState({
            message: {
                text: text,
                class: `alert alert-${type}`
            }
        });

        this.clearMessage();
    }

    clearMessage () {
        setTimeout(() => {
            this.setState({ message: { text: '', class: '' } });
        }, 5000);
    }

    render () {
        return void 0;
    }
}

export default MessageComponent;

var PropsStateValueMixin = {
    componentWillReceiveProps: function (newProps) {
        this.state.value = newProps.value;
    }
}

module.exports = PropsStateValueMixin;
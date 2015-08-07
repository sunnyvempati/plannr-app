var ToggableMenu = {
  getInitialState: function() {
    return {
      showMenu: false
    };
  },
  toggleMenu: function() {
    this.setState({showMenu: !this.state.showMenu});
  },
}

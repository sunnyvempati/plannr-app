var Avatar = React.createClass({
  render: function() {
    given_class = this.props.additional_classes;

    var cx = React.addons.classSet;
    classes = {};
    classes['Avatar'] = true;
    classes[given_class] = given_class;
    var avatar_class = cx(classes);

    return (
      <div className={avatar_class}>
      </div>
    );
  }
});

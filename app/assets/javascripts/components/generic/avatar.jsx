var Avatar = React.createClass({
  render: function() {
    var given_class = this.props.additional_classes;
    var classes = {};

    classes['Avatar'] = true;
    classes[given_class] = given_class;
    var avatar_class = classNames(classes);

    return (
      <div className={avatar_class}>
      </div>
    );
  }
});

var TaskActionButton = React.createClass({
    handleClick: function(href) {
        location.href = href;
    },
    render: function() {
        return (
            <div className="CreateTaskContainer" onClick={this.handleClick.bind(this, this.props.path)}>
                <ActionButton />
            </div>
        );
    }
});
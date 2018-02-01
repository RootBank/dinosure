import React from 'react';

export default class Input extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      curPos: (props.value || '').length,
      isLast: true
    };
  }

  componentDidMount() {
    if (this.props.focus !== undefined) this.refs.input.focus();
  }

  componentDidUpdate() {
    this.refs.input.setSelectionRange(this.state.curPos, this.state.curPos);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLast && nextProps.value) {
      const val = nextProps.value.toString();
      this.setState({ curPos: val.length, isLast: false });
    }
  }

  _onChange = (e) => {
    const curPos = e.target.selectionEnd;
    const val = e.target.value.toString();
    const isLast = val.length === curPos;
    this.setState({ curPos, isLast });
    this.props.onChange(e);
  };

  render() {
    return (
      <input
        className={this.props.className}
        disabled={this.props.disabled}
        autoFocus={this.props.autoFocus}
        style={this.props.style}
        onChange={this._onChange}
        value={this.props.value}
        placeholder={this.props.placeholder}
        ref='input'
      />
    );
  }
}
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getList } from '../actions/List';
import CommentListComponent from '../components/CommentList';

class CommentList extends Component {
  componentDidMount() {
    if (this.props.list.length === 0) {
      this.props.onGetList();
    }
  }

  render() {
    return (
      <CommentListComponent list={this.props.list} />
    );
  }
}

const mapStateToProps = state => ({
  list: state.list,
});

const mapDispatchToProps = {
  onGetList: getList,
};

CommentList.prefetchAction = [
  () => getList(),
];

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentList);

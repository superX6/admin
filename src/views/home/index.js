import React, { Component } from "react";
import http$ from "../../lib/axios";
import Subassembly from "../../components/Subassembly";
import { Row, Col, Pagination } from "antd";
import "./home.scss";
import moment from "moment";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      articleList: [],
      pageNo: 1
    };
    this.getList = this.getList.bind(this);
    this.handlerChangePageNo = this.handlerChangePageNo.bind(this);
  }

  componentDidMount() {
    this.getList();
    // Config.config();
  }
  handlerChangePageNo(val){
    this.setState({
      pageNo:val
    });
    this.getList();
  }
  
  getList() {
    const params = {
      pageNo: this.state.pageNo,
    };
    http$.get("/articles", { withCredentials: true, params: params })
      .then((data) => {
        // console.log(data, "data");
        const articleList = data.list || [];
        this.setState({
          articleList,
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.articleList.map((list, index) => {
          return (
            <Row key={index} className="article-list">
            <Col span={24}>
              <h3 className="art_title" onClick={() => this.props.history.push(`/detail/${list.id}`)}>{list.title}</h3>
              <i className="art_detail">{list.essentials}</i>
              <p>
                {/* <Subassembly label="views" info="66" />
                <Subassembly label="comment" info="0" />
                <Subassembly label="start" info="6" /> */}
                <Subassembly
                  info={moment(Number(list.update_time)).format("YYYY-MM-DD")}
                />
              </p>
            </Col>
            <Col span={15}></Col>
          </Row>
          );
        })}
        {this.state.articleList.length > 0 ? <Pagination defaultCurrent={1} total={50} onChange={this.handlerChangePageNo} /> : ''}
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    title: state.home.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
      get_article_list: bindActionCreators(get_article_list, dispatch),
      get_article_detail:bindActionCreators(get_article_detail,dispatch)
  }
}

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Home)

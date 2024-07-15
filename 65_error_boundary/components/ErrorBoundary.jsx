import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // 展示出错的UI
    this.setState({ hasError: true });
    // 将错误信息上报到日志服务器
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // 可以展示自定义的错误样式
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
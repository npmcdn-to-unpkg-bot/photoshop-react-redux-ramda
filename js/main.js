/*global $, window, location, CSInterface, SystemPath, themeManager, React, ReactDOM */

const { Provider, connect } = ReactRedux;

const csInterface = new CSInterface();

function loadJSX (fileName) {
  const extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
  csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
}

const SET_ACTIVE_LAYER = 'SET_ACTIVE_LAYER';
const SET_DOC_NAME = 'SET_DOC_NAME';

function setActiveLayer(data) {
  return {
    type: SET_ACTIVE_LAYER,
    data
  }
}

function setDocName(data) {
  return {
    type: SET_DOC_NAME,
    data
  }
}

const initialState = {
  activeLayer: null,
  docName: null,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_LAYER: {
      return R.assoc('activeLayer', action.data, state);
    }
    case SET_DOC_NAME: {
      return R.assoc('docName', action.data, state);
    }
  }

  return state;
}

const store = Redux.createStore(reducer);

const Button = function(props) {
  return (
    <button
      className='topcoat-button--large hostFontSize'
      onClick={props.onClick}
      children={props.children}
    />
  )
}

class App extends React.Component {
  getDocName() {
    csInterface.evalScript('getDocName()', function(layer) {
      store.dispatch(setDocName(layer))
    });
  }
  getActiveLayer() {
    csInterface.evalScript('getActiveLayer()', function(layer) {
      store.dispatch(setActiveLayer(layer))
    });
  }

  render() {
    const { activeLayer, docName } = this.props;
    return (
      <div>
        <Button onClick={this.getDocName}>Get Doc Name</Button>
        <Button onClick={this.getActiveLayer}>Get Active Layer</Button>
        <h1>Document Name: { docName }</h1>
        <h1>Active Layer: { activeLayer }</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { activeLayer, docName } = state;
  return {
    activeLayer, docName
  }
}

const ConnectedApp = connect(
  mapStateToProps
)(App);

function init() {
  loadJSX("json2.js");

  themeManager.init();
  function PhotoshopCallbackUnique(csEvent) {
    console.log(csEvent);
  }

  var extensionId =  csInterface.getExtensionID();
  csInterface.addEventListener("com.adobe.PhotoshopJSONCallback" + extensionId, function(event) {
    console.log(event)
  });


  ReactDOM.render(<Provider store={store}>
      <ConnectedApp />
    </Provider>,
    document.getElementById('react-root')
  )
}

init();

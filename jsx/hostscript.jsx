function getDocName(){
  return app.documents.length ? app.activeDocument.name : "No docs open!";
}

function getActiveLayer() {
  return app.documents.length && app.activeDocument.activeLayer;
}


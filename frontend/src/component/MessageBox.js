import React from "react";

export default function MessageBox(props) {

  const { error, seterror } = props

  return (
    <div className={error ? "d-block" : "d-none"}>

      <div className={`modal fade ${error ? "show" : ""}`} style={{ display: error ? "block" : "", height: '39%', zIndex: "100000000" }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{ position: "relative" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Error</h5>
              <button type="button" className="btn-close" onClick={() => seterror("")} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {error}
            </div>
            <div className="modal-footer">
              <button type="button" onClick={() => seterror("")} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

            </div>
          </div>
        </div>
      </div>
        <div onClick={() => seterror("")} style={{ position: "fixed", transition: "all .4 ease-in-out", top: "0", left: "0", backgroundColor: "#000", zIndex: "1", width: "100%", minHeight: "100vh", opacity: "0.3" }}>
        </div>



    </div>
  )
}
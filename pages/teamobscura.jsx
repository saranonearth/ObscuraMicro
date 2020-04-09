import React from "react";
import { useEffect } from "react";

import firebase from "../lib/firebase";

const Teamobscura = () => {
  return (
    <div>
      <div className="bar"> </div>{" "}
      <div className="nav">
        <div className="navbar">
          <div className="title">ObscurA</div>
        </div>
      </div>
      <div className="banner2">
        <div className="text">Team ObscurA</div>
      </div>
      <div className="tm-container">
        <div className="text">Architects</div>
        <div className="tm-row">
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FAnshulMalik.jpg?alt=media&token=c0ca42ca-00e4-4641-97d2-744e6ab156f7"
            />
            <div className="t-name">Anshul Malik</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FVedantNepal.jpg?alt=media&token=6679b8dc-d92d-40b9-891d-829a34c50c36"
            />
            <div className="t-name">Vedant Nepal</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FVatsal%20Garg.jpg?alt=media&token=cb259980-b4c9-4b25-a53a-db4374c6c391"
            />
            <div className="t-name">Vatsal Garg</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FIMG-20190113-WA0043.jpg?alt=media&token=a8c10714-75ba-4969-88aa-d9cc8734f6c0"
            />
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FSrijan%20Saxena.jpg?alt=media&token=30a0c414-5c3f-4455-af2e-e4be27eed59f"
            />
            <div className="t-name">Srijan Saxena</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FUtkarsh%20Kumar.jpg?alt=media&token=25abb44f-56a0-4a83-947e-ff1bbd0e6ce9"
            />
            <div className="t-name">Utkarsh Kumar</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FSaqibKamal.jpg?alt=media&token=1508c52c-24fb-48f1-a1fc-dc58af835625"
            />
            <div className="t-name">Saqib Kamal</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FPrashantKumar.jpg?alt=media&token=55f57edd-04ac-4192-aad2-98e59d62d09f"
            />
            <div className="t-name">Prashant Kumar</div>
          </div>
        </div>
        <div className="tm-row">
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FIMG-20190113-WA0041.jpg?alt=media&token=e71049a9-70d4-46a0-9930-a2b0d407c6f4"
            />
            <div className="t-name"></div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FArijit.jpg?alt=media&token=f5382acc-780e-4cda-b0e5-2a86079d22ec"
            />
            <div className="t-name">Arijit</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FDevayanMishra.jpg?alt=media&token=90e8c0eb-9b5c-4b7c-b584-b4822e29c05d"
            />
            <div className="t-name">Devayan Mishra</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2F12087904_1047786278566471_6169075697809371159_o.jpg?alt=media&token=a496f020-597c-4a2e-b80a-85a3c73004cb"
            />
            <div className="t-name"></div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FPusharak.jpg?alt=media&token=83963980-f83b-4224-aa30-1741a8d1f8ec"
            />
            <div className="t-name">Pusharak</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FTanviSingla.jpg?alt=media&token=0b1fe64f-9578-432c-a0fd-802366f7ecd6"
            />
            <div className="t-name">Tanvi Singhla</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FShubhankar.jpg?alt=media&token=8c801531-4ef0-4880-b296-9d4c8345f3d8"
            />
            <div className="t-name">Shubhankar</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FRajanNagpal.jpg?alt=media&token=3780cbdb-fe6f-4c2f-8f6f-6fbe7b739390"
            />
            <div className="t-name">Rajan Nagpal</div>
          </div>
        </div>
        <div className="tm-row">
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FSushantAdla.jpg?alt=media&token=a21dc8e9-95eb-46a5-9423-c68eea161efb"
            />
            <div className="t-name">Sushant Adla</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FPrakharMaheshwari.jpg?alt=media&token=dc04a1b9-d2fe-4ae6-bfbe-6fc3712da7fe"
            />
            <div className="t-name">Prakhar</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FAnujSharma.jpg?alt=media&token=30c83ca1-5d56-4e3c-9ae0-fdaf4d251ca4"
            />
            <div className="t-name">Anuj Sharma</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FAryanKaul.jpg?alt=media&token=8e95897b-9dd4-4a3a-bb35-b921e42221af"
            />
            <div className="t-name">Aryan Kaul</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FAvinashBharti.jpg?alt=media&token=c794ebe8-a487-4ac1-9d62-1243c67a58ed"
            />
            <div className="t-name">Avinash</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FKartikYadav.jpg?alt=media&token=961d8b71-bfda-4ae2-b014-9dd498a74644"
            />
            <div className="t-name">Kartik Yadav</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FSaurabhNandedkar.jpg?alt=media&token=ebddaaa9-b721-4800-810b-f72f1d22bebe"
            />
            <div className="t-name">Saurabh</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FYaseenGouseSamudri.jpg?alt=media&token=7322eaa2-b86d-440b-9226-ef33d3e5f4cb"
            />
            <div className="t-name">Yaseen</div>
          </div>
        </div>
        <div className="tm-row">
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FIMG_20190214_153118.jpg?alt=media&token=2136a921-1e0c-4877-bc73-03aec51f50d5"
            />
            <div className="t-name">Ajay</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FIMG_20190211_160435_885.jpg?alt=media&token=18fd8573-17eb-4e75-bf2b-611fc5bd338d"
            />
            <div className="t-name">Hemant</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2Fsaran.jpg?alt=media&token=55015d16-40d6-4811-8fde-d5bcdb5e663b"
            />
            <div className="t-name">Saran</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FUtkarsh%5B2331%5D.jpg?alt=media&token=bd5e37ad-5454-4263-8376-275e5cfa8fcf"
            />
            <div className="t-name">Utkarsh</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FIMG_20190822_122515%5B2330%5D.jpg?alt=media&token=c980d0d5-0056-419d-acb4-009ea5ac6ae9"
            />
            <div className="t-name">Pratyush</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FHardik.jpg?alt=media&token=ddd387fd-3771-45e7-a0ca-c404e65d98be"
            />
            <div className="t-name">Hardik</div>
          </div>
        </div>
        <div className="text">Developers</div>
        <div className="tm-row">
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2Fsaran.jpg?alt=media&token=55015d16-40d6-4811-8fde-d5bcdb5e663b"
            />
            <div className="t-name">Saran</div>
          </div>
          <div className="tm-member">
            <img
              className="t-image"
              src="https://firebasestorage.googleapis.com/v0/b/obscuramini-967ea.appspot.com/o/Team%2FHardik.jpg?alt=media&token=ddd387fd-3771-45e7-a0ca-c404e65d98be"
            />
            <div className="t-name">Hardik</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teamobscura;

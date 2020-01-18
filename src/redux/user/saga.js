// @flow
import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_CATEGORY,
  UPDATE_ACCOUNT_FINANCIAL,
  ADD_USER,
  GET_USERS,
  GET_USER,
  CHANGE_PASSWORD,
  ADD_CLIENT,
  GET_CLIENTS,
  GET_CLIENT,
  ADD_POLICY,
  GET_POLICY,
  UPDATE_POLICY,
  UPDATE_CLIENT,
  GET_SETTING
} from "../../constants/actionTypes";
import {
  updateAccountSuccess,
  updateAccountFailed,
  updateAccountFinancialSuccess,
  updateAccountFinancialFailed,
  updateAccountCategoriesSuccess,
  updateAccountCategoriesFailed,
  addUserSuccess,
  addUserFailed,
  getUsersSuccess,
  getUsersFailed,
  getUserSuccess,
  getUserFailed,
  changePasswordSuccess,
  changePasswordFailed,
  addClientSuccess,
  addClientFailed,
  getClientsSuccess,
  getClientsFailed,
  getClientSuccess,
  getClientFailed,
  addPolicySuccess,
  addPolicyFailed,
  getPolicySuccess,
  getPolicyFailed,
  getSettingFailed,
  getSettingSuccess,
  updatePolicySuccess,
  updatePolicyFailed,
  updateClientFailed,
  updateClientSuccess
} from "./actions";
import { logoutUser } from "../auth/actions";

/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
const fetchJSON = (url, options = {}) => {
  return axios(url, options)
    .then(json => {
      return json.data;
    })
    .catch(error => {
      throw error;
    });
};

function* updateAccount({ payload: { id, fullName, password } }) {
  const options = {
    data: { fullName, password },
    method: "PUT"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}users/${id}/account`,
      options
    );
    if (response._id) {
      yield put(updateAccountSuccess(true));
      yield put(updateAccountSuccess(false));
      yield put(logoutUser());
    } else {
      yield put(updateAccountFailed(false));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(updateAccountFailed(message));
  }
}

export function* watchUpdateAccount(): any {
  yield takeEvery(UPDATE_ACCOUNT, updateAccount);
}

function* updateAccountFinancial({ payload: { id, financial } }) {
  const options = {
    data: { financial },
    method: "PUT"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}users/${id}/account`,
      options
    );
    if (response._id) {
      yield put(updateAccountFinancialSuccess(true));
    } else {
      yield put(updateAccountFinancialFailed(false));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(updateAccountFinancialFailed(message));
  }
}

export function* watchUpdateAccountFinancial(): any {
  yield takeEvery(UPDATE_ACCOUNT_FINANCIAL, updateAccountFinancial);
}

function* updateAccountCategories({ payload: { id, categories } }) {
  const options = {
    data: { categories },
    method: "PUT"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}users/${id}/account`,
      options
    );
    if (response._id) {
      yield put(updateAccountCategoriesSuccess(true));
    } else {
      yield put(updateAccountCategoriesFailed(false));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(updateAccountCategoriesFailed(message));
  }
}

export function* watchUpdateAccountCategories(): any {
  yield takeEvery(UPDATE_ACCOUNT_CATEGORY, updateAccountCategories);
}


function* addUser({ payload: { fullName, username, role, password } }) {
  const options = {
    data: { fullName, username, role, password },
    method: "POST"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}users`,
      options
    );
    yield put(addUserSuccess(response));
    yield put(addUserSuccess({}));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(addUserFailed(message));
  }
}

export function* watchAddUser(): any {
  yield takeEvery(ADD_USER, addUser);
}

function* getUsers() {
  const options = {
    method: "GET"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}users`,
      options
    );
    yield put(getUsersSuccess(response));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(getUsersFailed(message));
  }
}

export function* watchGetUsers(): any {
  yield takeEvery(GET_USERS, getUsers);
}

function* getUser({ payload: id }) {
  const options = {
    method: "GET"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}users/${id}`,
      options
    );
    yield put(getUserSuccess(response));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(getUserFailed(message));
  }
}

export function* watchGetUser(): any {
  yield takeEvery(GET_USER, getUser);
}

function* changePassword({ payload: { id, fullName, role, password } }) {
  const options = {
    data: { fullName, role, password },
    method: "PUT"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}users/${id}/account`,
      options
    );
    if (response._id) {
      yield put(changePasswordSuccess(true));
      yield put(changePasswordSuccess(false));
    } else {
      yield put(changePasswordSuccess(false));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(changePasswordFailed(message));
  }
}

export function* watchChangePassword(): any {
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}

function* addClient({
  payload: {
    title,
    nricName,
    preferredName,
    nric_passport,
    dob,
    nextFollowUpDate,
    lastpurchasae,
    email,
    contact,
    contact2,
    race,
    nationality,
    familyrelationship,
    address,
    gender,
    family,
    annualExpense,
    monthlyExpense,
    annualShortTermSavings,
    monthlyShortTermSavings,
    annualIncome,
    monthlyIncome,
    companyaddress,
    companyname,
    occupation,
    referredsource,
    othersource,
    remarks,
    fileList
  }
}) {
  let data = new FormData();
  //Append files to form data
  // data.append("model", JSON.stringify({ "TenantId": "hello", "TenantUrl": "hello", "CertificatePassword": "this.state.CertificatePassword" }));
  //data.append("model", {"TenantId": this.state.TenantId, "TenantUrl": this.state.TenantUrl, "TenantPassword": this.state.TenantPassword });

  data.append(
    "client",
    JSON.stringify({
      title,
      nricName,
      preferredName,
      nric_passport,
      dob,
      nextFollowUpDate,
      lastpurchasae,
      email,
      contact,
      contact2,
      race,
      nationality,
      familyrelationship,
      address,
      gender,
      family,
      annualExpense,
      monthlyExpense,
      annualShortTermSavings,
      monthlyShortTermSavings,
      annualIncome,
      monthlyIncome,
      companyaddress,
      companyname,
      occupation,
      referredsource,
      othersource,
      remarks
    })
  );

  let files = fileList;
  for (let i = 0; i < files.length; i++) {
    let file = files[i].originFileObj;
    data.append("file", file, files[i].name);
  }

  const options = {
    data,
    method: "POST"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}clients`,
      options
    );
    yield put(addClientSuccess(response));
    yield put(addClientSuccess({}));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(addClientFailed(message));
  }
}

export function* watchAddClient(): any {
  yield takeEvery(ADD_CLIENT, addClient);
}

function* getClients({payload:key}) {
  let searchKey = '';
  if(key) {
    searchKey = key;
  }else {
    searchKey = '';
  }

  const options = {
    method: "GET"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}clients?key=` + searchKey,
      options
    );
    yield put(getClientsSuccess(response));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(getClientsFailed(message));
  }
}

export function* watchGetClients(): any {
  yield takeEvery(GET_CLIENTS, getClients);
}

function* getClient({ payload: id }) {
  const options = {
    method: "GET"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}clients/${id}`,
      options
    );
    yield put(getClientSuccess(response));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(getClientFailed(message));
  }
}

export function* watchGetClient(): any {
  yield takeEvery(GET_CLIENT, getClient);
}

function* addPolicy({
  payload: {
    id,
    policyName,
    policyNumber,
    policyType,
    company,
    policyStartDate,
    ageIncepted,
    policyEndAge,
    policyDuration,
    premiumSGD,
    paymentFrequency,
    paymentMethod,
    premiumEndAge,
    remarks,
    death,
    totalPermanentDisability,
    disabilityIncome,
    criticalIllness,
    earlyCriticalIllness,
    accidentalDeath,
    accidentalDisability,
    accidentalReimbursement,
    hospitalization,
    hospitalIncome,
    cashValueAge,
    cashValueAmount,
    other
  }
}) {
  // let data = new FormData();
  //Append files to form data
  // data.append("model", JSON.stringify({ "TenantId": "hello", "TenantUrl": "hello", "CertificatePassword": "this.state.CertificatePassword" }));
  //data.append("model", {"TenantId": this.state.TenantId, "TenantUrl": this.state.TenantUrl, "TenantPassword": this.state.TenantPassword });

  // data.append(
  //   "policy",
  //   JSON.stringify({
  //     policyName,
  //     policyNumber,
  //     policyType,
  //     company,
  //     policyStartDate,
  //     ageIncepted,
  //     policyEndAge,
  //     policyDuration,
  //     premiumSGD,
  //     paymentFrequency,
  //     paymentMethod,
  //     premiumEndAge,
  //     cashValueAge,
  //     cashValueAmount,
  //     remarks
  //   })
  // );
  // data.append(
  //   "benefit",
  //   JSON.stringify({
  //     death,
  //     totalPermanentDisability,
  //     disabilityIncome,
  //     criticalIllness,
  //     earlyCriticalIllness,
  //     accidentalDeath,
  //     accidentalDisability,
  //     accidentalReimbursement,
  //     hospitalization,
  //     hospitalIncome,
  //     other
  //   })
  // );

  // let files = fileList;
  // for (let i = 0; i < files.length; i++) {
  //   let file = files[i].originFileObj;
  //   data.append("file", file, files[i].name);
  // }

  const options = {
    data: {
      policy: {
        policyName,
        policyNumber,
        policyType,
        company,
        policyStartDate,
        ageIncepted,
        policyEndAge,
        policyDuration,
        premiumSGD,
        paymentFrequency,
        paymentMethod,
        premiumEndAge,
        cashValueAge,
        cashValueAmount,
        remarks
      },
      benefit: {
        death,
        totalPermanentDisability,
        disabilityIncome,
        criticalIllness,
        earlyCriticalIllness,
        accidentalDeath,
        accidentalDisability,
        accidentalReimbursement,
        hospitalization,
        hospitalIncome,
        other
      }
    },
    method: "POST",
    config: {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  };

  try {
    yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}clients/${id}/add-policy`,
      options
    );
    yield put(addPolicySuccess(true));
    yield put(addPolicySuccess(false));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(addPolicyFailed(message));
  }
}

export function* watchAddPolicy(): any {
  yield takeEvery(ADD_POLICY, addPolicy);
}

function* getPolicy({ payload: id }) {
  const options = {
    method: "GET"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}clients/${id}/policy`,
      options
    );
    yield put(getPolicySuccess(response));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(getPolicyFailed(message));
  }
}

export function* watchGetPolicy(): any {
  yield takeEvery(GET_POLICY, getPolicy);
}


function* getSetting({}) {
  const options = {
    method: "GET"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}settings/`,
      options
    );
    yield put(getSettingSuccess(response));
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(getSettingFailed(message));
  }
}

export function* watchGetSetting(): any {
  yield takeEvery(GET_SETTING, getSetting);
}

function* updatePolicy({
  payload: {
    id,
    policyName,
    policyNumber,
    policyType,
    company,
    policyStartDate,
    ageIncepted,
    policyEndAge,
    policyDuration,
    premiumSGD,
    paymentFrequency,
    paymentMethod,
    premiumEndAge,
    cashValueAge,
    cashValueAmount,
    remarks,
    benefitId,
    death,
    totalPermanentDisability,
    disabilityIncome,
    criticalIllness,
    earlyCriticalIllness,
    accidentalDeath,
    accidentalDisability,
    accidentalReimbursement,
    hospitalization,
    hospitalIncome,
    other
  }
}) {
  const options = {
    data: {
      policy: {
        policyName,
        policyNumber,
        policyType,
        company,
        policyStartDate,
        ageIncepted,
        policyEndAge,
        policyDuration,
        premiumSGD,
        paymentFrequency,
        paymentMethod,
        premiumEndAge,
        cashValueAge,
        cashValueAmount,
        remarks
      },
      benefit: {
        benefitId,
        death,
        totalPermanentDisability,
        disabilityIncome,
        criticalIllness,
        earlyCriticalIllness,
        accidentalDeath,
        accidentalDisability,
        accidentalReimbursement,
        hospitalization,
        hospitalIncome,
        other
      }
    },
    method: "PUT"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}clients/${id}/policy`,
      options
    );
    if (response._id) {
      yield put(updatePolicySuccess(true));
      yield put(updatePolicySuccess(false));
    } else {
      yield put(updatePolicyFailed(false));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(updatePolicyFailed(message));
  }
}

export function* watchUpdatePolicy(): any {
  yield takeEvery(UPDATE_POLICY, updatePolicy);
}

function* updateClient({
  payload: {
    id,
    title,
    nricName,
    preferredName,
    nric_passport,
    dob,
    nextFollowUpDate,
    lastpurchasae,
    email,
    contact,
    contact2,
    race,
    nationality,
    familyrelationship,
    address,
    gender,
    family,
    annualExpense,
    monthlyExpense,
    annualShortTermSavings,
    monthlyShortTermSavings,
    annualIncome,
    monthlyIncome,
    companyaddress,
    companyname,
    occupation,
    referredsource,
    othersource,
    remarks,
    undeleted,
    fileList
  }
}) {
  let data = new FormData();
  //Append files to form data
  // data.append("model", JSON.stringify({ "TenantId": "hello", "TenantUrl": "hello", "CertificatePassword": "this.state.CertificatePassword" }));
  //data.append("model", {"TenantId": this.state.TenantId, "TenantUrl": this.state.TenantUrl, "TenantPassword": this.state.TenantPassword });

  data.append(
    "client",
    JSON.stringify({
      title,
      nricName,
      preferredName,
      nric_passport,
      dob,
      nextFollowUpDate,
      lastpurchasae,
      email,
      contact,
      contact2,
      race,
      nationality,
      familyrelationship,
      address,
      gender,
      family,
      annualExpense,
      monthlyExpense,
      annualShortTermSavings,
      monthlyShortTermSavings,
      annualIncome,
      monthlyIncome,
      companyaddress,
      companyname,
      occupation,
      referredsource,
      othersource,
      remarks
    })
  );
data.append("undeleted",JSON.stringify(undeleted))
  let files = fileList;
  for (let i = 0; i < files.length; i++) {
    if (!files[i]._id) {
      let file = files[i].originFileObj;
      data.append("file", file, files[i].name);
    }
  }

  const options = {
    data,
    method: "PUT"
  };

  try {
    const response = yield call(
      fetchJSON,
      `${process.env.REACT_APP_API_URL}clients/${id}`,
      options
    );
    if (response._id) {
      yield put(updateClientSuccess(true));
      yield put(updateClientSuccess(false));
    } else {
      yield put(updateClientFailed(false));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(updateClientFailed(message));
  }
}

export function* watchUpdateClient(): any {
  yield takeEvery(UPDATE_CLIENT, updateClient);
}

function* userSaga(): any {
  yield all([
    fork(watchUpdateAccount),
    fork(watchUpdateAccountCategories),
    fork(watchUpdateAccountFinancial),
    fork(watchAddUser),
    fork(watchGetUsers),
    fork(watchGetUser),
    fork(watchChangePassword),
    fork(watchAddClient),
    fork(watchGetClients),
    fork(watchGetClient),
    fork(watchAddPolicy),
    fork(watchGetPolicy),
    fork(watchGetSetting),
    fork(watchUpdatePolicy),
    fork(watchUpdateClient)
  ]);
}

export default userSaga;

import {
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILED,
  UPDATE_ACCOUNT_FINANCIAL,
  UPDATE_ACCOUNT_FINANCIAL_SUCCESS,
  UPDATE_ACCOUNT_FINANCIAL_FAILED,
  UPDATE_ACCOUNT_CATEGORY,
  UPDATE_ACCOUNT_CATEGORY_SUCCESS,
  UPDATE_ACCOUNT_CATEGORY_FAILED,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  ADD_CLIENT,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_FAILED,
  GET_CLIENTS,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILED,
  GET_CLIENT,
  GET_CLIENT_SUCCESS,
  GET_CLIENT_FAILED,
  ADD_POLICY,
  ADD_POLICY_SUCCESS,
  ADD_POLICY_FAILED,
  GET_POLICY,
  GET_POLICY_SUCCESS,
  GET_POLICY_FAILED,
  GET_SETTING,
  GET_SETTING_SUCCESS,
  GET_SETTING_FAILED,
  UPDATE_POLICY,
  UPDATE_POLICY_SUCCESS,
  UPDATE_POLICY_FAILED,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILED,
  UPDATE_CLIENT
} from "../../constants/actionTypes";

type UserAction = {
  type: string,
  payload: {} | string
};

export const updateAccount = (
  id: string,
  fullName: string,
  password: string
): UserAction => ({
  type: UPDATE_ACCOUNT,
  payload: {
    id,
    fullName,
    password
  }
});

export const updateAccountSuccess = (updateAccount: boolean): UserAction => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  payload: updateAccount
});

export const updateAccountFailed = (error: string): UserAction => ({
  type: UPDATE_ACCOUNT_FAILED,
  payload: error
});

export const updateAccountFinancial = (
  id: string,
  financial: any
): UserAction => ({
  type: UPDATE_ACCOUNT_FINANCIAL,
  payload: {
    id,
    financial
  }
});

export const updateAccountFinancialSuccess = (updateAccount: boolean): UserAction => ({
  type: UPDATE_ACCOUNT_FINANCIAL_SUCCESS,
  payload: updateAccount
});

export const updateAccountFinancialFailed = (error: string): UserAction => ({
  type: UPDATE_ACCOUNT_FINANCIAL_FAILED,
  payload: error
});

export const updateAccountCategories = (
  id: string,
  categories: Array
): UserAction => ({
  type: UPDATE_ACCOUNT_CATEGORY,
  payload: {
    id,
    categories
  }
});

export const updateAccountCategoriesSuccess = (updateAccount: boolean): UserAction => ({
  type: UPDATE_ACCOUNT_CATEGORY_SUCCESS,
  payload: updateAccount
});

export const updateAccountCategoriesFailed = (error: string): UserAction => ({
  type: UPDATE_ACCOUNT_CATEGORY_FAILED,
  payload: error
});

export const addUser = (
  fullName: string,
  username: string,
  role: string,
  password: string
): UserAction => ({
  type: ADD_USER,
  payload: {
    fullName,
    username,
    role,
    password
  }
});

export const addUserSuccess = (user: {}): UserAction => ({
  type: ADD_USER_SUCCESS,
  payload: user
});

export const addUserFailed = (error: string): UserAction => ({
  type: ADD_USER_FAILED,
  payload: error
});

export const getUsers = (): UserAction => ({
  type: GET_USERS
});

export const getUsersSuccess = (users: []): UserAction => ({
  type: GET_USERS_SUCCESS,
  payload: users
});

export const getUsersFailed = (error: string): UserAction => ({
  type: GET_USERS_FAILED,
  payload: error
});

export const getUser = (id: string): UserAction => ({
  type: GET_USER,
  payload: id
});

export const getUserSuccess = (user: {}): UserAction => ({
  type: GET_USER_SUCCESS,
  payload: user
});

export const getUserFailed = (error: string): UserAction => ({
  type: GET_USER_FAILED,
  payload: error
});

export const changePassword = (
  id: string,
  fullName: string,
  role: string,
  password: string
): UserAction => ({
  type: CHANGE_PASSWORD,
  payload: {
    id,
    fullName,
    role,
    password
  }
});

export const changePasswordSuccess = (changePassword: boolean): UserAction => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: changePassword
});

export const changePasswordFailed = (error: string): UserAction => ({
  type: CHANGE_PASSWORD_FAILED,
  payload: error
});

export const addClient = (
  title: string,
  nricName: string,
  preferredName: string,
  nric_passport: string,
  dob: string,
  nextFollowUpDate: string,
  lastpurchasae: string,
  email: string,
  contact: string,
  contact2: string,
  race: string,
  nationality: string,
  familyrelationship: string,
  address: string,
  gender: string,
  family: string,
  annualExpense: string,
  monthlyExpense: string,
  annualShortTermSavings: string,
  monthlyShortTermSavings: string,
  annualIncome: string,
  monthlyIncome: string,
  companyaddress: string,
  companyname: string,
  occupation: string,
  referredsource: string,
  othersource: string,
  remarks: string,
  fileList: array,
): UserAction => ({
  type: ADD_CLIENT,
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
    fileList,
  }
});

export const addClientSuccess = (client: {}): UserAction => ({
  type: ADD_CLIENT_SUCCESS,
  payload: client
});

export const addClientFailed = (error: string): UserAction => ({
  type: ADD_CLIENT_FAILED,
  payload: error
});

export const getClients = (key: string): UserAction => ({
  type: GET_CLIENTS,
  payload: key
});

export const getClientsSuccess = (clients: []): UserAction => ({
  type: GET_CLIENTS_SUCCESS,
  payload: clients
});

export const getClientsFailed = (error: string): UserAction => ({
  type: GET_CLIENTS_FAILED,
  payload: error
});

export const getClient = (id: string): UserAction => ({
  type: GET_CLIENT,
  payload: id
});

export const getClientSuccess = (client: {}): UserAction => ({
  type: GET_CLIENT_SUCCESS,
  payload: client
});

export const getClientFailed = (error: string): UserAction => ({
  type: GET_CLIENT_FAILED,
  payload: error
});

export const addPolicy = (
  id: string,
  policyName,
  policyNumber: string,
  policyType: string,
  company: string,
  policyStartDate: string,
  ageIncepted: string,
  policyEndAge: string,
  policyDuration: string,
  premiumSGD: string,
  paymentFrequency: string,
  paymentMethod: string,
  premiumEndAge: string,
  remarks: string,
  death: string,
  cashValueAge: string,
  cashValueAmount: string,
  totalPermanentDisability: string,
  disabilityIncome: string,
  criticalIllness: string,
  earlyCriticalIllness: string,
  accidentalDeath: string,
  accidentalDisability: string,
  accidentalReimbursement: string,
  hospitalization: string,
  hospitalIncome: string,
  other: string,
): UserAction => ({
  type: ADD_POLICY,
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
    cashValueAge,
    cashValueAmount,
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
});

export const addPolicySuccess = (policy: {}): UserAction => ({
  type: ADD_POLICY_SUCCESS,
  payload: policy
});

export const addPolicyFailed = (error: string): UserAction => ({
  type: ADD_POLICY_FAILED,
  payload: error
});

export const getPolicy = (id: string): UserAction => ({
  type: GET_POLICY,
  payload: id
});

export const getPolicySuccess = (policy: {}): UserAction => ({
  type: GET_POLICY_SUCCESS,
  payload: policy
});

export const getPolicyFailed = (error: string): UserAction => ({
  type: GET_POLICY_FAILED,
  payload: error
});

export const getSetting = (): UserAction => ({
  type: GET_SETTING,
  payload: null
});

export const getSettingSuccess = (setting: {}): UserAction => ({
  type: GET_SETTING_SUCCESS,
  payload: setting
});

export const getSettingFailed = (error: string): UserAction => ({
  type: GET_SETTING_FAILED,
  payload: error
});

export const updatePolicy = (
  id: string,
  policyName: string,
  policyNumber: string,
  policyType: string,
  company: string,
  policyStartDate: string,
  ageIncepted: string,
  policyEndAge: string,
  policyDuration: string,
  premiumSGD: string,
  paymentFrequency: string,
  paymentMethod: string,
  premiumEndAge: string,
  cashValueAge: string,
  cashValueAmount: string,
  remarks: string,
  benefitId: string,
  death: string,
  totalPermanentDisability: string,
  disabilityIncome: string,
  criticalIllness: string,
  earlyCriticalIllness: string,
  accidentalDeath: string,
  accidentalDisability: string,
  accidentalReimbursement: string,
  hospitalization: string,
  hospitalIncome: string,
  other
): UserAction => ({
  type: UPDATE_POLICY,
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
});

export const updatePolicySuccess = (policy: boolean): UserAction => ({
  type: UPDATE_POLICY_SUCCESS,
  payload: policy
});

export const updatePolicyFailed = (error: string): UserAction => ({
  type: UPDATE_POLICY_FAILED,
  payload: error
});

export const updateClient = (
  id: string,
  title: string,
  nricName: string,
  preferredName: string,
  nric_passport: string,
  dob: string,
  nextFollowUpDate: string,
  lastpurchasae: string,
  email: string,
  contact: string,
  contact2: string,
  race: string,
  nationality: string,
  familyrelationship: string,
  address: string,
  gender: string,
  family: string,
  annualExpense: string,
  monthlyExpense: string,
  annualShortTermSavings: string,
  monthlyShortTermSavings: string,
  annualIncome: string,
  monthlyIncome: string,
  companyaddress: string,
  companyname: string,
  occupation: string,
  referredsource: string,
  othersource: string,
  remarks: string,
  undeleted: array,
  fileList: object,
): UserAction => ({
  type: UPDATE_CLIENT,
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
    fileList,
  }
});

export const updateClientSuccess = (client: boolean): UserAction => ({
  type: UPDATE_CLIENT_SUCCESS,
  payload: client
});

export const updateClientFailed = (error: string): UserAction => ({
  type: UPDATE_CLIENT_FAILED,
  payload: error
});
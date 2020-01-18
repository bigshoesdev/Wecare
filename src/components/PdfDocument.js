import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import moment from "moment";
// const riskmanagement=/risk Management/i;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    margin: "50px"
  },
  title: {
    padding: "10px;",
    marginTop: 5,
    fontSize: 10,
    fontWeight: 700,
    marginLeft: 52
  },
  margin: {
    marginTop: "20px"
    // marginBottom: "20px"
  },
  tableC: {
    display: "table",
    width: 400
  },
  ColC: {
    width: "150px",
    borderStyle: "solid"
  },

  table: {
    display: "table",
    width: "422px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 'auto',
  },
  tableRow: { flexDirection: "row" },
  tableCol: {
    width: "60px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { marginBottom: 3, fontSize: 9, padding: 5 },

  table1: {
    display: "table",
    width: "422px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow1: { flexDirection: "row" },
  tableCol1: {
    width: "60px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell1: { marginBottom: 3, fontSize: 11, padding: 5 },

  tableCol2: {
    width: "300px",
    // height:"100px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol3: {
    width: "120px",
    // height:"100px",
    borderStyle: "solid",
    borderWidth: 0.7,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCol5: {
    width: "60px"
    // height:"100px",
  }
});

export function PdfDocument(props) {
  const data = props.data;
  var annual_sum1 = 0;
  var monthly_sum1 = 0;
  var annual_sum2 = 0;
  var monthly_sum2 = 0;
  var annual_sum3 = 0;
  var monthly_sum3 = 0;
  return (
    <Document>
      <Page style={{ 'margin': '0 auto', 'size': 'A4' }}>
        {props.data.nricName ? (
          <View style={{ 'padding': '20' }}>
            <View style={{ 'backgroundColor': '#333', 'color': '#fff' }}>
              <View style={{ 'padding': '20' }}>
                <Text style={{ 'fontSize': '28' }}>Financial Portfolio</Text>
              </View>
              <View style={{ 'display': 'table', 'marginLeft': '10' }}>
                <View style={styles.tableRow}>
                  <View style={{ 'width': '200' }}>
                    <Text style={{ 'fontSize': 10, 'width': '200' }}>
                      Name: {data.nricName} ({data.preferredName})
                    </Text>
                  </View>
                  <View style={styles.ColC}>
                    <Text style={{ 'fontSize': 10, 'width': '200' }}>DOB:{moment(data.dob).format('DD-MMM-YYYY')}</Text>
                  </View>
                  <View style={styles.ColC}>
                    <Text style={{ 'fontSize': 10, 'width': '200' }}>NRIC: {data.nricName}</Text>
                  </View>
                </View>
              </View>
              <View style={{ 'display': 'table', 'marginLeft': '10', 'marginBottom': '20' }}>
                <View style={styles.tableRow}>
                  <View style={{ 'width': '200' }}>
                    <Text style={{ 'fontSize': 10, 'width': '200' }}>
                      Prepared By: {data.createdBy.fullName}
                    </Text>
                  </View>
                  <View style={styles.ColC}>
                    <Text style={{ 'fontSize': 10, 'width': '200' }}>
                      Prepared On: {moment(data.createdBy.createdOn).format('DD-MMM-YYYY')}
                    </Text>
                  </View>
                  <View style={styles.ColC}>
                    <Text style={{ 'fontSize': 10, 'width': '200' }}>FSC e-mail: {data.email}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.title}>Risk Management</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Company</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Benefit</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Plan Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy No.</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy Date</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cash Value</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Premium</Text>
                  </View>
                </View>
                {data.policies
                  ? data.policies.map((item, key) => {
                    if (
                      item.policyType.toUpperCase() ===
                      "Risk Management".toUpperCase()
                    ) {
                      if (item.paymentFrequency === "Annually") {
                        annual_sum1 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      }
                      else if (item.paymentFrequency === "Monthly") {
                        monthly_sum1 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      }
                      return (
                        <View key={key} style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.company}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyName}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyNumber}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyStartDate}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.premiumSGD}
                            </Text>
                          </View>
                        </View>
                      );
                    }

                    return null;
                  })
                  : null}
              </View>
              <View style={{ marginTop: "20px" }}></View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol2}>
                    <Text
                      style={{ margin: "auto", marginTop: "6px", fontSize: 10 }}
                    >
                      Total Premium for Risk Management
                    </Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>Annual</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>$&nbsp;{annual_sum1}</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol5}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>Monthly</Text>
                          </View>
                          <View style={styles.tableCol5}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>$&nbsp;{monthly_sum1}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.title}>Wealth Accumulation</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Company</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Benefit</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Plan Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy No.</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy Date</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cash Value</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Premium</Text>
                  </View>
                </View>
                {data.policies
                  ? data.policies.map((item, key) => {
                    if (
                      item.policyType.toUpperCase() ===
                      "Wealth Accumulation".toUpperCase()
                    ) {
                      if (item.paymentFrequency === "Annually") {
                        annual_sum2 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      } else if (item.paymentFrequency === "Monthly") {
                        monthly_sum2 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      }
                      return (
                        <View key={key} style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.company}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyName}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyNumber}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyStartDate}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.premiumSGD}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                    return null;
                  })
                  : null}
              </View>
              <View style={{ marginTop: "20px" }}></View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol2}>
                    <Text
                      style={{ margin: "auto", marginTop: "6px", fontSize: 10 }}
                    >
                      Total Premium for Wealth Accumulation
                    </Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>Annual</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>$&nbsp;{annual_sum2}</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol5}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>Monthly</Text>
                          </View>
                          <View style={styles.tableCol5}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>$&nbsp;{monthly_sum2}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View>
                <Text style={styles.title}>Preservation</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Company</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Benefit</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Plan Name</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy No.</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Policy Date</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Cash Value</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Premium</Text>
                  </View>
                </View>
                {data.policies
                  ? data.policies.map((item, key) => {
                    if (
                      item.policyType.toUpperCase() ===
                      "Wealth Preservation".toUpperCase()
                    ) {
                      if (item.paymentFrequency === "Annually") {
                        annual_sum3 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      }
                      if (item.paymentFrequency === "Monthly") {
                        monthly_sum3 += parseInt(item.premiumSGD) ? parseInt(item.premiumSGD) : 0;
                      }
                      return (
                        <View key={key} style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.company}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyName}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyNumber}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.policyStartDate}
                            </Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{""}</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                              {item.premiumSGD}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                    return null;
                  })
                  : null}
              </View>
              <View style={{ marginTop: "20px" }}></View>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol2}>
                    <Text
                      style={{ margin: "auto", marginTop: "6px", fontSize: 10 }}
                    >
                      Total Premium for Preservation
                    </Text>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>Annual</Text>
                          </View>
                          <View style={styles.tableCol}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>$&nbsp;{annual_sum3}</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={styles.tableCol5}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>Monthly</Text>
                          </View>
                          <View style={styles.tableCol5}>
                            <Text style={styles.tableCell, { 'fontSize': 9, 'padding': 5 }}>$&nbsp;{monthly_sum3}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}

      </Page>
    </Document>
  );
}

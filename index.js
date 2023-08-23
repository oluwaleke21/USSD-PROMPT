
function ussdPrompt() {
    // USSD TRANSACTION
    const homeSelection = Number(prompt(`Welcome, What will you like to do today?
    1. ATM transaction
    2. USSD transaction
    `))
    const selectionError = 'kindly make a selection from the available option'
    let BankBalance = 10000
    let airtimeBalance = 1000
    let defaultPin = 1234
    let maxPinTrials = 2
    let newBalance
    if (homeSelection === 1) {
        // Perform Bank transaction
        let pinValidation = false
        let userPin = Number(prompt('Kindly Enter Your 4 Digit Pin'))
        if (userPin !== defaultPin) {
            let pinAttempt = 1
            //continously collect pin until it is valid
            while (pinAttempt <= maxPinTrials) {
                userPin = Number(prompt(`Invaid pin kindly pls try again
            you have ${maxPinTrials - pinAttempt + 1} attempt left
            `))
                if (userPin === defaultPin) {
                    pinValidation = true
                    break
                }
                pinAttempt++
            }
        } else {
            pinValidation = true
        }
        // start application base on validation output
        if (pinValidation) {
            const BankList = {
                '1': 'Vista Bank',
                '2': 'Singapore Bank',
                '3': 'Bank Campus',
                '4': 'Academic Bank of Africa',
                '5': 'Bank Federal'
            }
            //provide all Bank transaction routes
            const BankHomeRoute = prompt(`Welcome to Classico Bank kindly make a selection
         1. Transfer
         2. Withdrawal
         3. Check balance
         `)
            //process user selection
            if (BankHomeRoute == 1) {
                const BankName = prompt(`Kindly select the Bank option:
             1. Vista Bank
             2. Singapore Bank
             3. Bank Campus
             4. Academic Bank of Africa
             5. Bank Federal
             `)
                if (BankName == 1 || BankName == 2 || BankName == 3 || BankName == 4 || BankName == 5) {
                    const accountNumber = prompt(`kindly enter the ten digit account number you want to transfer to`)
                    // get the amount to transfer
                    const transferAmount = Number(prompt(`kindly enter the amount to transfer`))
                    if (transferAmount <= BankBalance) {
                        let transferStatus = confirm(`Transfer ${transferAmount} to ${accountNumber} of ${BankList[BankName]}`)
                        if (transferStatus) {
                            newBalance = BankBalance - transferAmount
                            alert(`Transaction successfull`)
                            alert(`----Classico Bank----
                                 Debit alert:Dr
                                 Amount: ${transferAmount}
                                 Balance: ${newBalance}
                                 ----Thank you for choosing Classico----
                                 `)
                        }
                    } else {
                        alert('Insufficient Fund')
                    }
                } else {
                    prompt(selectionError)
                }
            } else if (BankHomeRoute == 2) {
                const amountToWithdraw = Number(prompt(`enter the amount to withdraw`))
                if (amountToWithdraw < BankBalance) {
                    newBalance = BankBalance - amountToWithdraw
                    alert(`Take your cash`)
                    alert(`----Classico Bank----
                 Debit alert:Dr
                 Amount: ${amountToWithdraw}
                 Balance: ${newBalance}
                 ----Thank you for choosing Classico----
                 `)
                } else {
                    alert('Insufficient fund')
                }
            } else if (BankHomeRoute == 3) {
                alert(`Your account balance is ${BankBalance}`)
            } else {
                prompt(selectionError)
            }
        }
    } else if (homeSelection === 2) {
        //perform USSD transaction
        let ussdRoute = Number(prompt(`
        1. check airtime balance
        2. buy airtime
        3. data recharge
    `))
        if (ussdRoute === 1) {
            // perform balance check
            alert(`Your airtime balance is ${airtimeBalance}`)
        } else if (ussdRoute === 2) {
            let airtimeAmount
            const airtimeRoute = Number(prompt(`Kindly select airtime route
            1. Self
            2. Other`))
            if (airtimeRoute === 1) {
                // send airtime to yourself
                airtimeAmount = Number(prompt('Kindly enter the amount you want to recharge'))
                if (airtimeAmount <= BankBalance) {
                    // add airtime to mobile and remove from Bank account
                    airtimeBalance += airtimeAmount
                    BankBalance -= airtimeAmount
                    alert(`Success
                        ${airtimeAmount} has been added to your account
                        your new balance is ${airtimeBalance}
                        `)
                    alert(`----Classico Bank----
                        Debit alert:Dr
                        Amount: ${airtimeAmount}
                        Balance: ${BankBalance}
                        ----Thank you for choosing Classico----
                        `)
                } else {
                    alert('Insufficient Fund')
                }
            } else if (airtimeRoute === 2) {
                // send airtime to others
                const thirdPartyNumber = prompt('Enter the number you wish to send airtime to')
                const thirdPartyNetwork = Number(prompt(`select third party network
            1. Airtel
            2. glo
            3. Mtn
            4. 9mobile
            `))
                airtimeAmount = Number(prompt('Kindly enter the amount you want to send'))
                // check amount against Bank balance
                if (airtimeAmount <= BankBalance) {
                    // remove from Bank account
                    confirm(`Transfer ${airtimeAmount} to ${thirdPartyNumber}`)
                    BankBalance -= airtimeAmount
                    alert(`Success
                        You sent ${airtimeAmount} to ${thirdPartyNumber}
                        `)
                    alert(`----Classico Bank----
                        Debit alert:Dr
                        Amount: ${airtimeAmount}
                        Balance: ${BankBalance}
                        ----Thank you for choosing Classico----
                        `)
                } else {
                    alert('Insufficient Fund')
                }

            } else {
                alert(selectionError)
            }
        } else if (ussdRoute == 3) {
            // data recharge
            const dataList = {
                '1': ['100mb', '100'],
                '2': ['500mb', '500'],
                '3': ['1.5Gb', '1000'],
                '4': ['30Gb', '4000'],
            }
            const dataRoute = Number(prompt(`Kindly select one of these options
        1. self
        2. others
        `))
            if (dataRoute === 1) {
                const dataAmount = prompt(`Please choose an option
            1. 100 for 100mb
            2. 500 for 500mb
            3. 1000 for 1.5Gb
            4. 4000 for 30Gb
            `)
                //check airtime balance against amount requested
                let costOfData = Number(dataList[dataAmount][1])
                let volumeOfData = dataList[dataAmount][0]
                if (costOfData <= airtimeBalance) {
                    confirm(`recharge ${volumeOfData} at rate of ${costOfData}`)
                    //process data and update airtime balance
                    airtimeBalance -= costOfData
                    alert(`You have successfully recharge ${volumeOfData}. enjoy`)
                    alert(`Your airtime balance is ${airtimeBalance}`)
                } else {
                    alert('You dont have enough data balance, kindly recharge and try again')
                }
            } else if (dataRoute === 2) {
                // recharge other
                const dataAmount = prompt(`Please choose an option
            1. 100 for 100mb
            2. 500 for 500mb
            3. 1000 for 1.5Gb
            4. 4000 for 30Gb
            `)
                let costOfData = Number(dataList[dataAmount][1])
                let volumeOfData = dataList[dataAmount][0]
                const beneficiaryNumber = prompt('Enter beneficiary number')
                if (costOfData <= airtimeBalance) {
                    confirm(`Recharge ${beneficiaryNumber} an amount of ${costOfData} worth ${volumeOfData}`)
                    airtimeBalance -= costOfData
                    alert(`You have successfully sent ${costOfData} to ${beneficiaryNumber} worth ${volumeOfData}`)
                    alert(`Your airtime balance is ${airtimeBalance}`)
                } else {
                    alert('Insuficient fund')
                }
            } else {
                alert(selectionError)
            }
        } else {
            alert(selectionError)
        }
    } else {
        alert(selectionError)
    }
    alert('Thank You for choosing Classico Bank')

}




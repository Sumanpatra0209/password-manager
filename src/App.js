import {Component} from 'react' 
import {v4} from 'uuid'


import './App.css'


const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
    state = {
        isTrue: false,
        latestList: [],
        website: '',
        username: '',
        password: '',
        isShow: false 
    }

    listenWebsite = event => {
        this.setState({website: event.target.value})
    }

    listenUsername = event => {
        this.setState({username: event.target.value})
    }

    listenPassword = event => {
        this.setState({password: event.target.value})
    }


    addContent = event => {
        event.preventDefault() 

        const {username, website, password} = this.state 
        const initial = website.slice(0, 1).toUpperCase() 
        const classValue = colorList[Math.floor(Math.random() * 5)]
        const newValues = {
            id: v4(),
            initialValue: initial,
            websiteName: website,
            userName: username,
            Password: password,
            classAdd: classValue
        }

        this.setState(prevState => ({
            latestList: [...prevState.latestList, newValues],
            website: '',
            username: '',
            password: '',
            isTrue: true,
            searchInput: ''
        }))

    }


    showPassword = event => {
        if (event.target.checked) {
            this.setState({isShow: true})
        }
        else {
            this.setState({isShow: false})
        }
    }

    searchList = event => {
        this.setState({searchInput: event.target.value})
    }

    deleteItem = id => {
        const {latestList} = this.state 
        const newList = latestList.filter(eachValue => eachValue.id !== id)
        const caseOf = newList.length !== 0 
        this.setState({latestList: newList, isTrue: caseOf})
    }

    render() {
        const {
            website,
            username,
            password,
            latestList,
            isShow,
            searchInput
        } = this.state 
        let {isTrue} = this.state 
        const newList = latestList.filter(eachValue => eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase())) 

        if (newList.length === 0) {
            isTrue = false 
        }
        else {
            isTrue = true 
        }

        return (
            <div className = "mainContainer">
                <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" alt = "app logo" className = "appLogo" />
                <div className = "subContainer">
                    <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png" alt = "password manager" className = "firstSubContainerImage2" />
                    <form className = "addDetails" onSubmit = {this.addContent}>
                        <h1 className = "detailHeading">Add New Password</h1>
                        <div className = "inputHolder">
                            <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png" alt = "website" className = "inputImage" />
                            <input type = "text" className = "inputElement" placeholder = "Enter Website" onChange = {this.listenWebsite} value = {website} />
                        </div>
                        <div className = "inputHolder">
                            <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png" className = "inputImage" alt = "username" />
                            <input type = "text" className = "inputElement" placeholder = "Enter Username" onChange = {this.listenUsername} value = {username} />
                        </div>
                        <div className = "inputHolder">
                            <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png" alt = "password" className = "inputImage" />
                            <input type = "password" className = "inputElement" placeholder = "Enter Password" onChange = {this.listenPassword} value = {password} />
                        </div>
                        <button type = "submit" className = "addBtn">Add</button>
                    </form>
                    <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png" className = "firstSubContainerImage1" alt = "password manager" />
                </div>
                <div className = "secondSubContainer">
                    <div className = "firstContainer">
                        <div className = "yourPassword">
                            <h1 className = "headingName">Your Passwords</h1>
                            <p className = "coloredText">{newList.length}</p>
                        </div>
                        <div className = "searchContainer">
                            <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png" className = "inputImage" alt = "search" />
                            <input type = "search" className = "inputElement" placeholder = "Search" onChange = {this.searchList} value = {searchInput} />
                        </div>
                    </div>
                    <hr />
                    <div className = "showPasswords">
                        <input type = "checkbox" className = "checkBox" id = "check" onChange = {this.showPassword}  />
                        <label htmlFor = "check" className = "labelPassword">Show Passwords</label>
                    </div>
                    {!isTrue && (
                        <div className = "emptyState">
                            <img src = "https://assets.ccbp.in/frontend/react-js/no-passwords-img.png" className = "emptyImage" alt = "no passwords" />
                            <p className = "noPasswords">No Passwords</p>
                        </div>
                    )}

                    {isTrue && (
                        <ul className = "resultContainer">
                            {newList.map(eachValue => (
                                <li className = "itemList" id = {eachValue.id} key = {eachValue.id}>
                                    <p className = {`initial ${eachValue.classAdd}`}>{eachValue.initialValue}</p>
                                    <div className = "listContent">
                                        <p className = "website">{eachValue.websiteName}</p>
                                        <p className = "website">{eachValue.userName}</p>

                                        {!isShow && (
                                            <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png" className = "starsImage" alt = "stars" />
                                        )}

                                        {isShow && <p className = "website">{eachValue.Password}</p>}
                                    </div>
                                    <button type = "button" className = "delButton" onClick = {() => this.deleteItem(eachValue.id)} data-testid = "delete">
                                        <img src = "https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png" alt = "delete" className = "delImage" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        )
    }

}


export default App 























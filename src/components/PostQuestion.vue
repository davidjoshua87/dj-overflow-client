<template>
    <div class="modal" id="postquestion">
        <div class="form">
            <h2>Post Question</h2><span style="float:right;cursor:pointer;margin-top:-3em;"
                @click='closemodal'>&times;</span>
            <p type="Title">
                <input v-validate="'required'" name="title" id="input-title" v-model='title'
                    placeholder="Write your question title...">
                <span style="color:red;font-size:10px;" v-show="errors.has('title')"
                    class="help is-danger">{{ errors.first('title') }}</span>
            </p>
            <p type="Description">
                <editor api-key="e35okpdgs5wel4anlmpc3mambugjgzs7bye50qeitpamkhgj" v-validate="'required'"
                    name="description" id="input-description" v-model='description'
                    placeholder="Enter your description here.."></editor>
                <span style="color:red;font-size:10px;" v-show="errors.has('description')"
                    class="help is-danger">{{ errors.first('description') }}</span>
            </p>
            <div class="buttons">
                <button @click='closemodal' class="rad-button warning flat" id="rad-button">Cancel</button>
                <button @click='postquestion' class="rad-button good flat" id="rad-button"> Post</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue';
    import swal from 'sweetalert2'
    export default {
        name: 'PostQuestion',
        data() {
            return {
                title: '',
                description: ''
            }
        },
        components: {
            'editor': Editor
        },
        methods: {
            closemodal: function () {
                let modal = document.getElementById('postquestion')
                modal.style.display = 'none'
            },
            postquestion: function () {
                let token = localStorage.getItem('token')
                this.$validator.validateAll().then(val => {
                    if (val) {
                        this.$http.post('/questions', {
                                title: this.title,
                                description: this.description
                            }, {
                                headers: {
                                    token
                                }
                            })
                            .then(post => {
                                this.closemodal()
                                swal({
                                    title: 'Question Posted!',
                                    text: 'Please check again in a bit for response',
                                    type: 'success',
                                    showConfirmButton: true
                                }).then(res => {
                                    window.location.reload()
                                })
                            })
                            .catch(err => {
                                swal({
                                    type: 'error',
                                    title: 'Oops...',
                                    text: 'Please make sure you are logged in!'
                                })
                                console.log(err)
                            })
                    } else {
                        console.log('error: unable to post')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    /* modal  */
    .modal {
        display: none;
        /* Hidden by default */
        position: fixed;
        /* Stay in place */
        z-index: 1;
        /* Sit on top */
        left: 0;
        top: 0;
        width: 100%;
        /* Full width */
        height: 100%;
        /* Full height */
        overflow: scroll;
        /*Enable scroll if needed */
        background-color: rgb(0, 0, 0);
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4);
        /* Black w/ opacity */
    }

    .form {
        width: 80%;
        height: 50%;
        background: azure;
        border-radius: 8px;
        box-shadow: 0 0 40px -10px #000;
        margin: 15% auto;
        padding: 20px 30px;
        max-width: calc(100vw - 40px);
        height: 100%;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
        position: relative;
    }

    h2 {
        margin: 10px 0;
        padding-bottom: 10px;
        /* width: 180px; */
        color: #78788c;
        border-bottom: 3px solid #78788c;
    }

    input {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: none;
        outline: none;
        resize: none;
        border: 0;
        font-family: "Montserrat", sans-serif;
        transition: all 0.3s;
        border-bottom: 2px solid #bebed2;
    }

    input::-webkit-input-placeholder {
        font-size: 20px
    }

    input:focus {
        border-bottom: 2px solid #78788c;
    }

    p {
        text-align: left;
        /* margin-left: 2em; */
        padding: 0 2em;
    }

    p:before {
        content: attr(type);
        display: block;
        margin: 28px 0 0;
        font-size: 14px;
        color: #5a5a5a;
    }

    .buttons>button {
        margin: 10px 60px;
    }

    #input-description {
        margin-top: 20px;
        width: 100%;
        height: 5vw;
        overflow: hidden;
        background-color: #FFF;
        color: #222;
        font-family: Helvetica, Arial;
        font-weight: normal;
        font-size: 12px;
        resize: none;
        line-height: 15px;
        padding: 2px 10px;
    }

    button:hover {
        background: #78788c;
        color: #fff;
    }

    .foot {
        content: "Hi";
        position: absolute;
        bottom: -15px;
        right: -20px;
        background: #50505a;
        color: #fff;
        width: 320px;
        padding: 16px 4px 16px 0;
        border-radius: 6px;
        font-size: 13px;
        box-shadow: 10px 10px 40px -14px #000;
    }

    span {
        margin: 0 5px 0 15px;
    }

    @media all and (max-width: 700px) {
        .modal {
            display: none;
            /* Hidden by default */
            position: fixed;
            /* Stay in place */
            z-index: 1;
            /* Sit on top */
            left: 0;
            top: 0;
            width: 100%;
            /* Full width */
            height: 100%;
            /* Full height */
            overflow: scroll;
            /*Enable scroll if needed */
            background-color: rgb(0, 0, 0);
            /* Fallback color */
            background-color: rgba(0, 0, 0, 0.4);
            /* Black w/ opacity */
        }

        .form {
            width: 90%;
            height: 100%;
            background: azure;
            border-radius: 8px;
            /* box-shadow: 0 0 40px -10px #000; */
            margin: 5% auto;
            padding: 5px 10px;
            max-width: calc(100vw - 40px);
            box-sizing: border-box;
            box-sizing: border-box;
            font-family: "Montserrat", sans-serif;
            position: relative;
        }

        input::-webkit-input-placeholder {
            font-size: 10px
        }

        #input-description {
            margin-top: 10px;
            width: 90%;
            height: 5vw;
            font-size: 12px;
            resize: none;
            line-height: 6px;
            padding: 2px 6px;
        }

        p {
            text-align: left;
            padding: 0 5px;
        }

        p:before {
            content: attr(type);
            display: block;
            margin: 7px 0 0;
            font-size: 12px;
            color: #5a5a5a;
        }

        h2 {
            font-size: 16px;
        }

        editor {
            height: 30px;
        }
    }
</style>

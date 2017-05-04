/**
 *
 * Copyright 2017 Yoshihiro Tanaka
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: Yoshihiro Tanaka <contact@cordea.jp>
 * date  : 2017-05-04
 */

/// <reference path="../node_modules/@types/chrome/index.d.ts" />

const SENDER_ID_KEY = "senderId"

const REGISTRATION_ID_KEY = "registrationId"

class Options {

    constructor() {
        this.restore()
        document
            .getElementById("register")
            .addEventListener("click", () => this.registerFcm())
        document
            .getElementById("unregister")
            .addEventListener("click", () => this.unregisterFcm())

    }

    private registerFcm() {
        let senderId = (<HTMLInputElement>document.getElementById("senderId")).value
        chrome.gcm.register([senderId], (registrationId) =>
        {
            console.log(senderId)
            console.log(registrationId)
            this.save(senderId, registrationId)
        })
    }

    private unregisterFcm() {
        chrome.gcm.unregister(() =>
        {
            this.save("", "")
        })
    }

    private restore() {
        let gets = {}
        gets[SENDER_ID_KEY] = ""
        gets[REGISTRATION_ID_KEY] = ""

        chrome.storage.sync.get(gets, (items) =>
        {
            this.setValues(items)
        });
    }

    private save = (senderId: string, registrationId: string) => {
        let sets = {}
        sets[SENDER_ID_KEY] = senderId
        sets[REGISTRATION_ID_KEY] = registrationId

        chrome.storage.sync.set(sets, () =>
        {
            (<HTMLInputElement>document.getElementById("register")).value = "Registered"
            this.setValues(sets);
        })
    }

    private setValues = (items: {[key: string]: any}) => {
        (<HTMLInputElement>document.getElementById("senderId")).value =
            SENDER_ID_KEY in items
            ? items[SENDER_ID_KEY]
            : ""
        document.getElementById("regId").innerText =
            REGISTRATION_ID_KEY in items
            ? items[REGISTRATION_ID_KEY]
            : ""
    }
}

window.addEventListener("load", () =>
{
    new Options()
})
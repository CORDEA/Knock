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

const MESSAGES_KEY = "messages"

const PAYLOAD_KEY = "payload"

class FcmReceiver {

    constructor() {
        this.listenFcm()
        this.restore(this.refreshBadge)
    }

    private listenFcm(): void {
        chrome.gcm.onMessage.addListener((message) => {
            this.save(message.data, this.refreshBadge)
        })
    }

    private refreshBadge = (items: {[key: number]: string}) => {
        let n = items ? Object.keys(items).length : 0
        console.log(n.toString())
        chrome.browserAction.setBadgeText({"text": n.toString()})
    }

    private save = (message: any,
        onComplete: (items: {[key: number]: string}) => void) => {
        chrome.storage.sync.get((items) => {
            let time = new Date().getTime().toString()
            if (MESSAGES_KEY in items && Object.keys(items[MESSAGES_KEY]).length > 0) {
                items[MESSAGES_KEY][time] = message
            } else {
                items[MESSAGES_KEY] = {}
                items[MESSAGES_KEY][time] = message
            }
            chrome.storage.sync.set(items, () => onComplete(items[MESSAGES_KEY]))
        })
    }

    private restore = (onComplete: (items: {[key: number]: string}) => void) => {
        let gets = {}
        gets[MESSAGES_KEY] = []

        chrome.storage.sync.get(gets, (items) => onComplete(items[MESSAGES_KEY]))
    }
}

window.addEventListener("load", () => {
    new FcmReceiver()
})
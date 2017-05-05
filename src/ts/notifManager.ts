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
 * date  : 2017-05-05
 */

/// <reference path="../../node_modules/@types/chrome/index.d.ts" />

const MESSAGES_KEY = "messages"

class NotifManager {

    public notifications(onComplete: (items: {[key: string]: string}) => void) {
        let gets = {}
        gets[MESSAGES_KEY] = []

        chrome.storage.sync.get(gets, (items) => onComplete(items[MESSAGES_KEY]))
    }

    public addNotification(item: any,
        onComplete: (items: {[key: string]: string}) => void) {
        chrome.storage.sync.get((items) => {
            let time = new Date().getTime().toString()
            if (MESSAGES_KEY in items && Object.keys(items[MESSAGES_KEY]).length > 0) {
                items[MESSAGES_KEY][time] = item
            } else {
                items[MESSAGES_KEY] = {}
                items[MESSAGES_KEY][time] = item
            }
            chrome.storage.sync.set(items, () => onComplete(items[MESSAGES_KEY]))
        })
    }

    public removeNotification(key: string, onComplete: () => void) {
        chrome.storage.sync.get((items) => {
            if (MESSAGES_KEY in items && Object.keys(items[MESSAGES_KEY]).length > 0) {
                if (key in items[MESSAGES_KEY]) {
                    delete items[MESSAGES_KEY][key]
                }
            }
            chrome.storage.sync.set(items, () => onComplete())
        })
    }
}

export { NotifManager }
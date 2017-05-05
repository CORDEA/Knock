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

/// <reference path="../../node_modules/@types/chrome/index.d.ts" />

import { NotifManager } from "./notifManager"

class FcmReceiver {

    private notifManager: NotifManager = new NotifManager()

    constructor() {
        this.listenFcm()
        this.notifManager.notifications(this.refreshBadge)
    }

    private listenFcm(): void {
        chrome.gcm.onMessage.addListener((message) => {
            this.notifManager.addNotification(message.data, this.refreshBadge)
        })
    }

    public refreshBadge = (items: {[key: number]: string}) => {
        let n = items ? Object.keys(items).length : 0
        chrome.browserAction.setBadgeText({"text": n.toString()})
    }
}

export { FcmReceiver }

window.addEventListener("load", () => {
    new FcmReceiver()
})
<template>
    <div id ="app">
        <template v-if="enabled">
            <ul class="demo-list-control mdl-list">
                <template v-for="(notif, key) in notifications">
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <i class="material-icons  mdl-list__item-avatar">person</i>
                            {{ notif.title }}
                        </span>
                        <a class="mdl-list__item-secondary-action" href="#" @click="check(key)">
                            <i class="material-icons">star</i>
                        </a>
                    </li>
                </template>
            </ul>
        </template>
        <template v-else>
            <div class="no-item">
                <h4 class="headline">No notification</h4>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import { NotifManager } from "./ts/notifManager"
import { FcmReceiver } from "./ts/background"

@Component({})
export default class App extends Vue {

    notifManager: NotifManager = new NotifManager()

    notifications = {}

    enabled = false

    created() {
        this.notifManager.notifications((items) => {
            this.notifications = items
            this.enabled = Object.keys(items).length > 0
        })
    }

    check(key: string) {
        this.notifManager.removeNotification(key, () =>
        {
            this.notifManager.notifications((items) => {
                this.notifications = items
                this.enabled = Object.keys(items).length > 0
                new FcmReceiver().refreshBadge(items)
            })
        })
    }
}
</script>

<style>

ul {
    min-width: 300px;
}

.no-item {
    min-width: 300px;
    display: flex;
}

.no-item h4 {
    margin: 16px auto;
}

</style>
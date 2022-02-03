<template>
  <div class="main">
    <van-search v-model="value" placeholder="Please input your keywords" />
    <van-grid :column-num="2">
      <van-grid-item>
        <van-button
          color="linear-gradient(to right, #accbee 0%, #e7f0fd 100%)"
          round
          type="info"
          @click="handleAdd"
          >Add New Game</van-button
        >
      </van-grid-item>
      <van-grid-item>
        <van-icon
          style="cursor: pointer"
          name="sort"
          @click="sort_value ? CharacterAscending() : CharacterDescending()"
        />
      </van-grid-item>
    </van-grid>
    <van-dialog
      width="500px"
      :show-confirm-button="false"
      v-model="show"
      title="Add New Game"
      show-cancel-button
    >
      <van-form @submit="onSubmit">
        <van-field
          v-model="name"
          name="name"
          label="Game Name"
          placeholder="please input game name"
          :rules="[{ required: true, message: 'Game name is required' }]"
        />
        <van-field
          v-model="icon_url"
          name="icon_url"
          label="Icon Url"
          placeholder="please input icon url"
          :rules="[{ required: true, message: 'Icon url is required' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >Upload</van-button
          >
        </div>
      </van-form>
    </van-dialog>
    <transition-group tag="ul" name="drag" class="list">
      <li
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
        draggable
        v-for="(item, index) in computedGameList"
        :key="item.id"
      >
        <img :src="item.icon_url" alt="Oops, something is wrong" />
        <span>{{ item.name }}</span>
        <van-icon
          style="cursor: pointer"
          @click="handleDelete(item.id)"
          name="close"
        />
      </li>
    </transition-group>
  </div>
</template>

<script>
import game from "../../static/json/game.json";
export default {
  data() {
    return {
      list: [],
      show: false,
      value: "",
      dragIndex: "",
      enterIndex: "",
      name: "",
      icon_url: "",
      sort_value: 1,
    };
  },

  methods: {
    CharacterAscending() {
      this.list.sort(
        (a, b) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
      this.sort_value = 0;
    },
    CharacterDescending() {
      this.list.sort(
        (a, b) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
      this.sort_value = 1;
    },
    dragstart(index) {
      this.dragIndex = index;
    },
    dragenter(e, index) {
      e.preventDefault();
      if (this.dragIndex !== index) {
        const source = this.list[this.dragIndex];
        this.list.splice(this.dragIndex, 1);
        this.list.splice(index, 0, source);
        this.dragIndex = index;
      }
    },
    dragover(e, index) {
      e.preventDefault();
    },

    handleAdd() {
      this.show = true;
      this.name = "";
      this.icon_url = "";
    },

    onSubmit(values) {
      this.$store.commit("addGame", values);
      this.show = false;
    },

    handleDelete(id) {
      this.$dialog
        .confirm({
          message: "Are you sure for deleting it?",
        })
        .then(() => {
          this.$store.commit("removeGame", id);
        })
        .catch(() => {});
    },
  },

  mounted() {
    if (!this.$store.state.gameList.length) {
      game.data.forEach((item) => {
        item.id = Symbol();
      });
      this.$store.commit("getGame", game.data);
      this.list = this.$store.state.gameList;
    }

    this.list = this.$store.state.gameList;
  },

  computed: {
    computedGameList() {
      if (this.value === "") return this.list;
      return this.list.filter((item) =>
        item.name.toUpperCase().includes(this.value.toUpperCase())
      );
    },
  },
};
</script>

<style scoped>
.main{
  background-color: #fff;
}
.list {
  list-style: none;
}

.list .drag-move {
  transition: all 0.3s;
}

li {
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(190, 187, 187);
  background-color: #fff;
}

li:hover {
  transition: all 0.3s;
  box-shadow: inset 4px 0 0 0 #346cb0;
  cursor: pointer;
  background-color: #f1f1f1;
}

li img {
  width: 80px;
  height: 80px;
  border-radius: 20px;
}

li span {
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 2;
  text-align: center;
}
</style>
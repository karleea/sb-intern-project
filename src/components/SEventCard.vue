<script>
export default {
  name: 'SEventCard'
}
</script>


<template>
  <div class="card">
    <table>
      <tr class="table-title">
        <slot name="eventTitle" />
      </tr>
      <tr>
        <th class="table-header"> </th>
        <th class="table-header">ML </th>
        <th class="table-header">Spread </th>
      </tr>
      <tr>
        <td>
          <slot name="teamOneName" />
        </td>
        <td>
          <slot name="teamOneML" />
        </td>
        <td>
          <slot name="teamOneSpread" />
        </td>
      </tr>
      <tr>
        <td>
          <slot name="teamTwoName" />
        </td>
        <td>
          <slot name="teamTwoML" />
        </td>
        <td>
          <slot name="teamTwoSpread" />
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px solid #b8b7b6;
  background-color: #e7e8e8;
  border-radius: 4px;
  padding: .5rem;
}

.table-header {
  border-bottom: 1px solid #b8b7b6;
  background-color: #ffff;
}

.table-title {
  color: #081f36;
}
</style>

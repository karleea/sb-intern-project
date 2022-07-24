<script>
export default {
    name: 'SEventCard'
}
</script>


<template>
<div class="card">
    <table>
        <tr><slot name="eventTitle"/></tr>
        <tr>
            <th> </th>
            <th>ML </th>
            <th>Spread</th>
        </tr>
        <tr>
            <td><slot name="teamOneName"/></td>
            <td><slot name="teamOneML"/></td>
            <td><slot name="teamOneSpread" /></td>
        </tr>
        <tr>
            <td><slot name="teamTwoName"/></td>
            <td><slot name="teamTwoML"/></td>
            <td><slot name="teamTwoSpread" /></td>
        </tr>
    </table>
</div> 

</template>
<style lang="scss" scoped>

.card {
border: 2px solid #000000;
border-radius: 4px;
padding: .5rem;
 
}

</style>

<template>
  <div>
    <table>
      <tbody>
        <tr class="com-koma">
          <td id="com1" class="c-koma">歩</td>
          <td id="com3" class="c-koma">香</td>
          <td id="com4" class="c-koma">桂</td>
          <td id="com6" class="c-koma">銀</td>
          <td id="com7" class="c-koma">金</td>
          <td id="com9" class="c-koma">角</td>
          <td id="com10" class="c-koma">飛</td>	
        </tr>
        <tr>
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td></td><td></td><td></td>
          <td id="com-bet" class="com-koma"></td>
          <td></td><td></td><td></td>
        </tr>
        <tr>
          <td></td><td></td><td></td>
          <td id="field"></td>
          <td></td>
          <td id="go">初手</td><td></td>
        </tr>
        <tr>
          <td></td><td></td><td></td>
          <td id="player-bet"></td>
          <td></td><td></td><td></td>
        </tr>
        <tr>
          <td></td><td></td><td></td>
          <td></td><td></td><td></td><td></td>
        </tr>
        <tr>
            <td id="p1" class="p-koma">歩</td>
            <td id="p3" class="p-koma">香</td>
            <td id="p4" class="p-koma">桂</td>
            <td id="p6" class="p-koma">銀</td>
            <td id="p7" class="p-koma">金</td>
            <td id="p9" class="p-koma">角</td>
            <td id="p10" class="p-koma">飛</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ShogiBan',
}
</script>

<style scoped>
table {
  border:solid 2px black;
  border-collapse:collapse;
  /* background-image:url("wood1.jpg"); */
}

td{
		text-align:center;
		width:60px;
		height:60px;
		font-size:35px;
		font-weight:bold;
		border:solid 2px black;
		
	}
#field{
		text-align:center;
		line-height:70px;
		
		font-size:18px;
		font-weight:bold;

		
		
	}
	
#go{
		font-size:18px;
		background:#E7B87A;
		pointer-events:none;
		cursor:pointer;
	}
#go:hover{
		opacity:0.7;
}
	
#com-bet{
		text-align:center;
		-ms-transform:rotate(180deg);
		-webkit-transform:rotate(180deg);
		line-height:70px;
		font-size:40px;
		font-weight:bold;
		background:#E7B87A;
	}

#player-bet{
		text-align:center;
	
		line-height:70px;
		font-size:40px;
		font-weight:bold;
		background:#E7B87A;
	
	}
.com-koma {
  transform: rotate(0.5turn);
  -webkit-transform: rotate(0.5turn);
}
.p-koma{
		cursor:pointer;
}
	
.p-koma:hover{
		opacity:0.5;
}

</style>

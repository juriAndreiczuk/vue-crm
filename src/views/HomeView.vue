<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Currency Acount</span>

            <p class="currency-line">
              <span>12.0 Р</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Course</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>course</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Pln</td>
                  <td>12121</td>
                  <td>12.12.12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

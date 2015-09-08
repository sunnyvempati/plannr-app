class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments, id: :uuid do |t|
      t.date :due_date
      t.uuid :expense_id
      t.float :amount
      t.integer :payment_method
      t.date :paid_date
      t.text :notes

      t.timestamps null: false
    end
  end
end

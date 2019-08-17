# frozen_string_literal: true

# User
class User < ApplicationRecord
  has_many :notes, dependent: :destroy

  def self.from_token_payload(payload)
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
